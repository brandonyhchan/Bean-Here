import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { SEEDER_ACCOUNT_PASSWORD } from "../src/utils/config";
import fs from 'fs/promises';

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

  const cafesData = await fs.readFile('./prisma/data/cafes.json', 'utf-8');
  const cafes = JSON.parse(cafesData);

  cafes.forEach(cafe => {
    const province = provinceCodes.find(p => p.code === cafe.province);
    if (province) {
      cafe.province = province.code;
    }

    const busyness = filterOptions.find(f => f.level === cafe.busyness);
    if (busyness) {
      cafe.busyness = busyness.level;
    }

    const noisiness = filterOptions.find(f => f.level === cafe.noisiness);
    if (noisiness) {
      cafe.noisiness = noisiness.level;
    }
  });

  try {
    for (const cafe of cafes) {
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
    await seedCafes();
  } catch (error) {
    console.error("There was an error seeding the database", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase().then((r) => console.log(r));
