/*
  Warnings:

  - Added the required column `province` to the `Cafe` table without a default value. This is not possible if the table is not empty.

*/
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
    CONSTRAINT "Cafe_busyness_fkey" FOREIGN KEY ("busyness") REFERENCES "FilterOption" ("level") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Cafe_noisiness_fkey" FOREIGN KEY ("noisiness") REFERENCES "FilterOption" ("level") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Cafe_province_fkey" FOREIGN KEY ("province") REFERENCES "ProvinceCode" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Cafe" ("busyness", "city", "id", "name", "noisiness", "phoneNumber", "postalCode", "profilePhotoURL", "street", "stringId", "website") SELECT "busyness", "city", "id", "name", "noisiness", "phoneNumber", "postalCode", "profilePhotoURL", "street", "stringId", "website" FROM "Cafe";
DROP TABLE "Cafe";
ALTER TABLE "new_Cafe" RENAME TO "Cafe";
CREATE UNIQUE INDEX "Cafe_stringId_key" ON "Cafe"("stringId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
