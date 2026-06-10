import "dotenv/config";
import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_SPODOP_URL;

if (!connectionString) {
  throw new Error("Missing DATABASE_SPODOP_URL in environment.");
}

const adapter = new PrismaPg({
  connectionString,
});

const db = new PrismaClient({ adapter });

export default db;
