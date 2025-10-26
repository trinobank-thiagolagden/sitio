import "dotenv/load.ts";

export const config = {
  port: parseInt(Deno.env.get("PORT") || "8000"),
  mongoUri: Deno.env.get("MONGODB_URI") || "mongodb://localhost:27017",
  dbName: Deno.env.get("DB_NAME") || "controle_custos",
};
