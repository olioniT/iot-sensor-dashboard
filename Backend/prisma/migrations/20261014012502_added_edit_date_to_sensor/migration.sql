/*
  Warnings:

  - You are about to alter the column `created_at` on the `Sensor` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
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
    "last_edited" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#000000'
);
INSERT INTO "new_Sensor" ("color", "created_at", "created_by", "id", "location", "max_temperature", "min_temperature", "name", "status", "update_interval") SELECT "color", "created_at", "created_by", "id", "location", "max_temperature", "min_temperature", "name", "status", "update_interval" FROM "Sensor";
DROP TABLE "Sensor";
ALTER TABLE "new_Sensor" RENAME TO "Sensor";
CREATE UNIQUE INDEX "Sensor_name_key" ON "Sensor"("name");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" INTEGER NOT NULL,
    "join_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_edited" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("id", "name", "password", "role", "username") SELECT "id", "name", "password", "role", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
