-- CreateTable
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

-- CreateTable
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
    "price" TEXT,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    CONSTRAINT "Cafe_price_fkey" FOREIGN KEY ("price") REFERENCES "PriceOption" ("level") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Cafe_noisiness_fkey" FOREIGN KEY ("noisiness") REFERENCES "NoisinessOption" ("level") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Cafe_busyness_fkey" FOREIGN KEY ("busyness") REFERENCES "BusynessOption" ("level") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Cafe_province_fkey" FOREIGN KEY ("province") REFERENCES "ProvinceCode" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProvinceCode" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "country" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BusynessOption" (
    "level" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "NoisinessOption" (
    "level" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "PriceOption" (
    "level" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "BusinessHours" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "weekday" TEXT NOT NULL,
    "start" TEXT,
    "end" TEXT,
    "cafeId" INTEGER NOT NULL,
    CONSTRAINT "BusinessHours_cafeId_fkey" FOREIGN KEY ("cafeId") REFERENCES "Cafe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cafe_stringId_key" ON "Cafe"("stringId");
