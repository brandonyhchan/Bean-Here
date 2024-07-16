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
    "province" TEXT NOT NULL CHECK (province IN ('AB', 'BC', 'MB', 'NB', 'NL', 'NT', 'NS', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT')),
    "postalCode" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "website" TEXT,
    "profilePhotoURL" TEXT,
    "busyness" TEXT NOT NULL DEFAULT 'LOW' CHECK(busyness IN ('LOW', 'MEDIUM', 'HIGH')),
    "noisiness" TEXT NOT NULL DEFAULT 'LOW' CHECK(noisiness IN ('LOW', 'MEDIUM', 'HIGH')),
    FOREIGN KEY ("busyness") REFERENCES "FilterOption" ("level"),
    FOREIGN KEY ("noisiness") REFERENCES "FilterOption" ("level"),
    FOREIGN KEY ("province") REFERENCES "ProvinceCode" ("code")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "cafeId" INTEGER NOT NULL,
    CONSTRAINT "Location_cafeId_fkey" FOREIGN KEY ("cafeId") REFERENCES "Cafe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FilterOption" (
    "level" TEXT NOT NULL PRIMARY KEY
);

-- Insert levels
INSERT INTO "FilterOption" (level) VALUES
('LOW'),
('MEDIUM'),
('HIGH');

-- CreateTable
CREATE TABLE "ProvinceCode" (
    "code" TEXT NOT NULL PRIMARY KEY
);

-- Insert province codes
INSERT INTO "ProvinceCode" (code) VALUES
('AB'),
('BC'),
('MB'),
('NB'),
('NL'),
('NT'),
('NS'),
('NU'),
('ON'),
('PE'),
('QC'),
('SK'),
('YT');

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cafe_stringId_key" ON "Cafe"("stringId");

-- CreateIndex
CREATE UNIQUE INDEX "Location_latitude_key" ON "Location"("latitude");

-- CreateIndex
CREATE UNIQUE INDEX "Location_longitude_key" ON "Location"("longitude");

-- CreateIndex
CREATE UNIQUE INDEX "Location_cafeId_key" ON "Location"("cafeId");
