/*
  Warnings:

  - You are about to drop the `FilterOption` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `country` to the `ProvinceCode` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FilterOption";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "BusynessOption" (
    "level" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "NoisinessOption" (
    "level" TEXT NOT NULL PRIMARY KEY
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cafe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stringId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "website" TEXT,
    "profilePhotoURL" TEXT,
    "busyness" TEXT,
    "noisiness" TEXT,
    CONSTRAINT "Cafe_province_fkey" FOREIGN KEY ("province") REFERENCES "ProvinceCode" ("code") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Cafe_busyness_fkey" FOREIGN KEY ("busyness") REFERENCES "BusynessOption" ("level") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Cafe_noisiness_fkey" FOREIGN KEY ("noisiness") REFERENCES "NoisinessOption" ("level") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Cafe" ("busyness", "city", "id", "name", "noisiness", "phoneNumber", "postalCode", "profilePhotoURL", "province", "street", "stringId", "website") SELECT "busyness", "city", "id", "name", "noisiness", "phoneNumber", "postalCode", "profilePhotoURL", "province", "street", "stringId", "website" FROM "Cafe";
DROP TABLE "Cafe";
ALTER TABLE "new_Cafe" RENAME TO "Cafe";
CREATE UNIQUE INDEX "Cafe_stringId_key" ON "Cafe"("stringId");
CREATE TABLE "new_ProvinceCode" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "country" TEXT NOT NULL
);
INSERT INTO "new_ProvinceCode" ("code") SELECT "code" FROM "ProvinceCode";
DROP TABLE "ProvinceCode";
ALTER TABLE "new_ProvinceCode" RENAME TO "ProvinceCode";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
