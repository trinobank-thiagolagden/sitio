import { MongoClient, Db } from "mongodb";
import { config } from "./env";

let db: Db | null = null;
let client: MongoClient | null = null;

export async function connectDB(): Promise<Db> {
  if (db) {
    return db;
  }

  try {
    client = new MongoClient(config.mongoUri);
    await client.connect();
    db = client.db(config.dbName);

    console.log(`✅ Connected to MongoDB: ${config.dbName}`);

    return db;
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    throw error;
  }
}

export function getDB(): Db {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB() first.");
  }
  return db;
}

export async function closeDB(): Promise<void> {
  if (client) {
    await client.close();
    db = null;
    client = null;
    console.log("✅ MongoDB connection closed");
  }
}
