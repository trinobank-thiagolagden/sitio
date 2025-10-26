export const config = {
  port: parseInt(process.env.PORT || "8000"),
  mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017",
  dbName: process.env.DB_NAME || "controle_custos",
};
