/*
  Warnings:

  - You are about to drop the column `activestate` on the `Sensor` table. All the data in the column will be lost.
  - You are about to drop the column `temp` on the `Sensor` table. All the data in the column will be lost.
  - You are about to drop the column `admin` on the `User` table. All the data in the column will be lost.
  - Added the required column `created_at` to the `Sensor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `Sensor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_temperature` to the `Sensor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `min_temperature` to the `Sensor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_interval` to the `Sensor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "SensorReadings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reading" DECIMAL NOT NULL,
    "recorded_at" TEXT NOT NULL,
    "sensor_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sensor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "min_temperature" DECIMAL NOT NULL,
    "max_temperature" DECIMAL NOT NULL,
    "update_interval" INTEGER NOT NULL,
    "created_at" TEXT NOT NULL,
    "created_by" INTEGER NOT NULL
);
INSERT INTO "new_Sensor" ("id", "location", "name") SELECT "id", "location", "name" FROM "Sensor";
DROP TABLE "Sensor";
ALTER TABLE "new_Sensor" RENAME TO "Sensor";
CREATE UNIQUE INDEX "Sensor_name_key" ON "Sensor"("name");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" INTEGER NOT NULL
);
INSERT INTO "new_User" ("id", "name", "password") SELECT "id", "name", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");
