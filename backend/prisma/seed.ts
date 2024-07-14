import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { SEEDER_ACCOUNT_PASSWORD } from "../src/utils/config";

const prisma = new PrismaClient();

/**
 * Seed initial user data.
 * @async
 * @returns {Object} seeded user account
 */
async function seedUsers() {
  const hashedPassword = await bcrypt.hash(SEEDER_ACCOUNT_PASSWORD, 10);
  try {
    return await prisma.user.upsert({
      where: { id: 1 },
      update: {},
      create: {
        userName: "bigpepe",
        email: "test@test.com",
        firstName: "Big",
        lastName: "Pepe",
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Seed the database with initial data.
 * @async
 */
async function seedDatabase() {
  try {
    await seedUsers();
  } catch (error) {
    console.error("There was an error seeding the database", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase().then((r) => console.log(r));
