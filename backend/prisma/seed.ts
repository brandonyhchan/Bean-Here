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
 * Seed initial cafe data.
 * @async
 * @returns {Object} seeded cafe
 */
async function seedCafes() {
  const filterOptions = await prisma.filterOption.findMany();
  const provinceCodes = await prisma.provinceCode.findMany();
  try {
    return await prisma.cafe.upsert({
      where: { stringId: "1" },
      update: {},
      create: {
        stringId: "1",
        name: "Breka Bakery & Café (Main St)",
        street: "4554 Main St",
        city: "Vancouver",
        province: provinceCodes[1].code,
        postalCode: "V5V 3R5",
        phoneNumber: "604-559-0900",
        website: "http://breka.ca",
        busyness: filterOptions[1].level,
        noisiness: filterOptions[0].level,
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
    await seedCafes();
  } catch (error) {
    console.error("There was an error seeding the database", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase().then((r) => console.log(r));
