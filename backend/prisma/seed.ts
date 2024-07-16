import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { SEEDER_ACCOUNT_PASSWORD } from "../src/utils/config";
import fs from "fs/promises";

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
 * Seed province codes for countries (currently only Canada).
 * 
 * Countries can be expanded in the future to include states, prefectures, etc.
 * 
 * @async
 * @returns {Object} seeded provinces
 */
async function seedProvinces() {
  const provincePath = await fs.readFile("./prisma/data/provinces.json", "utf-8");
  const provinceData = JSON.parse(provincePath);

  const countries = provinceData.countries;

  // loop through all countries and seed provinces for each
  for (const country of countries) {
    const provinces = country.provinces;
    for (const code of provinces) {
      await prisma.provinceCode.create({
        data: { 
          code: code,
          country: country.country
        },
      });
    }
  }
}

/**
 * Seed busyness levels for cafes.
 * @async
 * @returns {Object} seeded busyness levels
 */
async function seedBusynessLevels() {
  const levels = ["LOW", "MEDIUM", "HIGH"];

  for (const level of levels) {
    await prisma.busynessOption.create({
      data: { level },
    });
  }
}

/**
 * Seed noisiness levels for cafes.
 * @async
 * @returns {Object} seeded noisiness levels
 */
async function seedNoisinessLevels() {
  const levels = ["LOW", "MEDIUM", "HIGH"];

  for (const level of levels) {
    await prisma.noisinessOption.create({
      data: { level },
    });
  }
}

/**
 * Seed initial cafe data.
 * @async
 * @returns {Object} seeded cafe
 */
async function seedCafes() {

  // Get all of the data for each category
  const provinceCodes = await prisma.provinceCode.findMany();
  const busynessOptions = await prisma.busynessOption.findMany();
  const noisinessOptions = await prisma.noisinessOption.findMany();

  const cafePath = await fs.readFile("./prisma/data/cafes.json", "utf-8");
  const cafeData = JSON.parse(cafePath);

  cafeData.forEach((cafe) => {
    const province = provinceCodes.find((p) => p.code === cafe.province);
    if (province) {
      cafe.province = province.code;
    }

    const busyness = busynessOptions.find((b) => b.level === cafe.busyness);
    if (busyness) {
      cafe.busyness = busyness.level;
    }

    const noisiness = noisinessOptions.find((n) => n.level === cafe.noisiness);
    if (noisiness) {
      cafe.noisiness = noisiness.level;
    }
  });

  try {
    for (const cafe of cafeData) {
      await prisma.cafe.upsert({
        where: { stringId: cafe.stringId },
        update: {},
        create: cafe,
      });
    }
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
    await seedProvinces();
    await seedBusynessLevels();
    await seedNoisinessLevels();
    await seedCafes();
  } catch (error) {
    console.error("There was an error seeding the database", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase().then((r) => console.log(r));
