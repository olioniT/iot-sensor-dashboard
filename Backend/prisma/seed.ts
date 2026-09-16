import "dotenv/config";
import { Pool } from "pg";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  const alice = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "Alice",
      admin: false,
      password: "Unencrypted",
    },
  });

  const bob = await prisma.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: "Bob",
      admin: true,
      password: "Encrypted",
    },
  });

  const senslab = await prisma.sensor.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "Lab Sensor",
      temp: 20,
      location: "Lab",
      activestate: true,
    },
  });
  
  const sensoutside = await prisma.sensor.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: "Outside Sensor",
      temp: 30,
      location: "Outside",
      activestate: true,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });