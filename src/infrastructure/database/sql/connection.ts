import { DataSource } from "typeorm";
import "dotenv/config";
import { SubscriptionEntity } from "./entity/subscription.entity";

// Initialize TypeORM DataSource
const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST as string,
  port: parseInt(process.env.POSTGRES_PORT as any) || 5432,
  username: process.env.POSTGRES_USERNAME as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DATABASE as string,
  logging: true,
  entities: [SubscriptionEntity], 
  synchronize: process.env.NODE_ENV !== "production",
});

// Connect to PostgreSQL
const connectDB = async () => {
  try {
    if (
      !process.env.POSTGRES_HOST ||
      !process.env.POSTGRES_USERNAME ||
      !process.env.POSTGRES_PASSWORD ||
      !process.env.POSTGRES_DATABASE
    ) {
      throw new Error("PostgreSQL environment variables must be defined");
    }
    await AppDataSource.initialize();
    console.log("Connected to PostgreSQL database");
    return AppDataSource;
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};

// Disconnect from PostgreSQL
const disconnectDB = async () => {
  try {
    await AppDataSource.destroy();
    console.log("PostgreSQL disconnected");
  } catch (error) {
    console.error("Error while disconnecting from PostgreSQL:", error);
    throw error;
  }
};

export { connectDB, disconnectDB, AppDataSource };
