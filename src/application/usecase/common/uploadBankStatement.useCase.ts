import { BadRequest } from "@buxlo/common";
import { IPaymentHistoryRepository } from "../../../domain/interfaces/IPaymentHistoryRepository";
import {
  PaymentHistoryMapper,
  PaymentHistoryResponseDto,
} from "../../dto/paymentHistoryResponse.dto";
import { IUploadBankStatementUseCase } from "../../interface/common/IUploadBankStatementUseCase";
import * as fs from "fs";
import csv from "csv-parser";
import { PaymentHistoryStatus } from "../../../infrastructure/@types/enums/PaymentHistoryStatus";
import { Readable } from "stream";
import { PaymentType } from "../../../infrastructure/@types/enums/PaymentType";
import crypto from "crypto";

export class UploadBankStatementUseCase implements IUploadBankStatementUseCase {
  constructor(private _paymentHistoryRepository: IPaymentHistoryRepository) {}

  async execute(
    userId: string,
    file: Express.Multer.File
  ): Promise<PaymentHistoryResponseDto[]> {
    if (!file) throw new BadRequest("Upload a valid bank file");
    if (!file.mimetype.includes("csv") && !file.originalname.endsWith(".csv")) {
      throw new BadRequest("Only CSV files are supported");
    }

    try {
      // Step 1: Parse CSV
      const rows: any[] = file.path
        ? await this.parseCSV(file.path)
        : await this.parseCSVBuffer(file.buffer);

      if (!rows.length) throw new BadRequest("Uploaded CSV is empty");

      // Step 2: Validate & map
      const records = rows.map((row) => {
        const debitStr = row["Debit (INR)"] || row["Debit"] || "0";
        const creditStr = row["Credit (INR)"] || row["Credit"] || "0";

        if (!row["Date"] || (!debitStr && !creditStr)) {
          throw new BadRequest(
            `Bank statement row missing required fields: ${JSON.stringify(row)}`
          );
        }

        const debit = parseFloat(debitStr) || 0;
        const credit = parseFloat(creditStr) || 0;
        const amount = debit > 0 ? -debit : credit;

        if (isNaN(amount) || amount === 0) {
          throw new BadRequest(`Invalid amount in row: ${JSON.stringify(row)}`);
        }

        const transactionDate = new Date(row["Date"]);
        if (isNaN(transactionDate.getTime())) {
          throw new BadRequest(`Invalid date in row: ${JSON.stringify(row)}`);
        }

        // Use Ref No. if available, otherwise generate a unique hash based on transaction details
        let paymentId = row["Ref No."] || row["PaymentID"] || row["Reference No."];
        
        if (!paymentId) {
          // Create a deterministic hash from transaction details to detect duplicates
          const transactionHash = crypto
            .createHash("sha256")
            .update(`${userId}-${transactionDate.toISOString()}-${amount}-${row["Description"] || ""}`)
            .digest("hex")
            .substring(0, 16);
          
          paymentId = `TXN-${transactionHash}`;
        }

        const type = credit > 0 ? PaymentType.CREDIT : PaymentType.DEBIT;
        const category = "expenses";

        return {
          paymentId,
          userId,
          amount,
          category: category.toLowerCase(),
          status: PaymentHistoryStatus.COMPLETED,
          type,
          transactionDate,
        };
      });

      // Step 3: Check for existing transactions to avoid duplicates
      const existingPaymentIds = await this._paymentHistoryRepository.findExistingPaymentIds(
        userId,
        records.map((r) => r.paymentId)
      );

      // Filter out duplicate transactions
      const newRecords = records.filter(
        (record) => !existingPaymentIds.includes(record.paymentId)
      );

      // If all records are duplicates, return empty array
      if (newRecords.length === 0) {
        console.log(
          `All ${records.length} transaction(s) already exist for user ${userId}. Skipping upload.`
        );
        return [];
      }

      // Step 4: Save only new records
      const savedRecords = await Promise.all(
        newRecords.map((record) => this._paymentHistoryRepository.create(record))
      );

      // Step 5: Return DTOs for all saved records
      const response = savedRecords.map((rec) => PaymentHistoryMapper.toDto(rec));

      // Notify user if some records were skipped
      const skippedCount = records.length - newRecords.length;
      if (skippedCount > 0) {
        console.log(
          `Skipped ${skippedCount} duplicate transaction(s) for user ${userId}`
        );
      }

      return response;
    } catch (error) {
      console.error("Error in UploadBankStatementUseCase:", error);
      if (error instanceof BadRequest) {
        throw error;
      }
      throw new BadRequest("Failed to upload bank statement");
    } finally {
      if (file.path) {
        fs.unlink(file.path, (err) => {
          if (err) console.error("Error deleting uploaded file:", err);
        });
      }
    }
  }

  private parseCSVBuffer(buffer: Buffer): Promise<Record<string, string>[]> {
    return new Promise((resolve, reject) => {
      const results: Record<string, string>[] = [];
      const readable = new Readable();
      readable.push(buffer);
      readable.push(null);

      readable
        .pipe(csv())
        .on("data", (data: Record<string, string>) => results.push(data))
        .on("end", () => resolve(results))
        .on("error", (err: Error) => reject(err));
    });
  }

  private parseCSV(filePath: string): Promise<Record<string, string>[]> {
    return new Promise((resolve, reject) => {
      const results: Record<string, string>[] = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data: Record<string, string>) => results.push(data))
        .on("end", () => resolve(results))
        .on("error", (err: Error) => reject(err));
    });
  }
}