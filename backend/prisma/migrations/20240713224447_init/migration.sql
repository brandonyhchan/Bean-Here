PRAGMA foreign_keys=off;

-- Create Tables
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "photoName" TEXT,
    "photoURL" TEXT
);

CREATE TABLE "Cafe" (
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

CREATE TABLE "Location" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "cafeId" INTEGER NOT NULL,
    CONSTRAINT "Location_cafeId_fkey" FOREIGN KEY ("cafeId") REFERENCES "Cafe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE "ProvinceCode" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "country" TEXT NOT NULL
);

CREATE TABLE "BusynessOption" (
    "level" TEXT NOT NULL PRIMARY KEY
);

CREATE TABLE "NoisinessOption" (
    "level" TEXT NOT NULL PRIMARY KEY
);

-- Create indexes
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

CREATE UNIQUE INDEX "Cafe_stringId_key" ON "Cafe"("stringId");

CREATE UNIQUE INDEX "Location_latitude_key" ON "Location"("latitude");

CREATE UNIQUE INDEX "Location_longitude_key" ON "Location"("longitude");

CREATE UNIQUE INDEX "Location_cafeId_key" ON "Location"("cafeId");

PRAGMA foreign_keys=on;
