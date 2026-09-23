/*
  Warnings:

  - You are about to drop the column `location` on the `TemperatureReadings` table. All the data in the column will be lost.
  - Added the required column `sensorid` to the `TemperatureReadings` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TemperatureReadings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sensorid" INTEGER NOT NULL,
    "temperature" INTEGER NOT NULL,
    "time" TEXT NOT NULL
);
INSERT INTO "new_TemperatureReadings" ("id", "temperature", "time") SELECT "id", "temperature", "time" FROM "TemperatureReadings";
DROP TABLE "TemperatureReadings";
ALTER TABLE "new_TemperatureReadings" RENAME TO "TemperatureReadings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
