import { BadRequest } from "@buxlo/common";
import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../database/sql/connection";
import { IwalletRepository } from "../../domain/interfaces/IwalletRepository";
import { WalletEntity } from "../database/sql/entity/wallet.entity";
import { Wallet } from "../../domain/entities/wallet.entites";

export class WalletRepository implements IwalletRepository {
  private _repository: Repository<WalletEntity>;

  constructor(private _manager?: EntityManager) {
    const repoManager = this._manager || AppDataSource.manager;
    this._repository = repoManager.getRepository(WalletEntity);
  }

  async create(data: Wallet): Promise<Wallet> {
    try {
      const wallet = this._repository.create(data);
      return await this._repository.save(wallet);
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
      const wallet = await this._repository.findOne({
        where: { userId, name },
      });

      if (!wallet) {
        throw new BadRequest(
          `Wallet not found for user ${userId} with name ${name}`
        );
      }

      await this._repository.update(wallet.id, data);

      return await this._repository.findOneOrFail({
        where: { id: wallet.id },
      });
    } catch (error: any) {
      console.error("Error from wallet repository: failed to update", error);
      throw new BadRequest(`Failed to update wallet: ${error.message}`);
    }
  }

  async fetchWallet(userId: string): Promise<Wallet[]> {
    try {
      return await this._repository.find({
        where: { userId },
        order: { createdAt: "DESC" },
      });
    } catch (error: any) {
      console.error("Error from wallet repository failed to fetch ", error);
      throw new BadRequest(`Failed to fetch wallet: ${error.message}`);
    }
  }
}
