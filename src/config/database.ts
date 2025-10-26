import { MongoClient, Database } from "mongo";

let db: Database | null = null;

export async function connectDB(): Promise<Database> {
  if (db) {
    return db;
  }

  const mongoUri = Deno.env.get("MONGODB_URI") || "mongodb://localhost:27017";
  const dbName = Deno.env.get("DB_NAME") || "controle_custos";

  try {
    const client = new MongoClient();
    await client.connect(mongoUri);
    db = client.database(dbName);

    console.log(`✅ Connected to MongoDB: ${dbName}`);

    return db;
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    throw error;
  }
}

export function getDB(): Database {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB() first.");
  }
  return db;
}
