import { BadRequest } from "@buxlo/common";
import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../database/sql/connection";
import { IwalletRepository } from "../../domain/interfaces/IwalletRepository";
import { WalletEntity } from "../database/sql/entity/wallet.entity";
import { Wallet } from "../../domain/entities/wallet";

export class WalletRepository implements IwalletRepository {
  private repository: Repository<WalletEntity>;

  constructor(private manager?: EntityManager) {
    const repoManager = this.manager || AppDataSource.manager;
    this.repository = repoManager.getRepository(WalletEntity);
  }

  async create(data: Wallet): Promise<Wallet> {
    try {
      // Create and save new wallet
      const wallet = this.repository.create(data);
      return await this.repository.save(wallet);
    } catch (error: any) {
      throw new BadRequest(`Failed to create wallet: ${error.message}`);
    }
  }
  async updateWallet(
    userId: string,
    name: string,
    data: Partial<Wallet>
  ): Promise<Wallet> {
    try {

      const wallet = await this.repository.findOne({
        where: { userId, name },
      });

      if (!wallet) {
        throw new BadRequest(
          `Wallet not found for user ${userId} with name ${name}`
        );
      }

      await this.repository.update(wallet.id, data);
      console.log("before update");

      return await this.repository.findOneOrFail({
        where: { id: wallet.id },
      });
    } catch (error: any) {
      console.error("Error from wallet repository: failed to update", error);
      throw new BadRequest(`Failed to update wallet: ${error.message}`);
    }
  }

  async fetchWallet(userId: string): Promise<Wallet[] | null> {
    try {
      return await this.repository.find({
        where: { userId: userId },
        order: {
          createdAt: "DESC",
        },
      });
    } catch (error: any) {
      console.error("Error from wallet repository faild to fetch ", error);
      throw new BadRequest(`Failed to fetch wallet: ${error.message}`);
    }
  }
}
