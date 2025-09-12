import { KafkaConsumer, UserCreatedEvent } from "@buxlo/common";
import { Topics } from "@buxlo/common/build/events/topics";
import { Consumer, KafkaMessage } from "kafkajs";
import { Wallet } from "../../../../domain/entities/wallet.entites";
import { WalletRepository } from "../../../repositories/walletRepositary";

export class WalletCreatedConsumer extends KafkaConsumer<UserCreatedEvent> {
  topic: Topics.userCreated = Topics.userCreated;

  constructor(consumer: Consumer) {
    super(consumer);
  }

  async onConsume(
    data: UserCreatedEvent["data"],
    msg: KafkaMessage
  ): Promise<void> {
    try {
      const walletRepository = new WalletRepository();
      const wallet: Wallet = {
        userId: data.id,
        name: "Primary",
        balance: 0,
      };
      await walletRepository.create(wallet);
      console.log("Wallet created successfully", wallet);
    } catch (error) {
      console.error("error in createing wallet", error);
    }
  }
}
