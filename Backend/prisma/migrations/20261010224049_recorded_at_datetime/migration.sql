/*
  Warnings:

  - You are about to alter the column `recorded_at` on the `SensorReadings` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SensorReadings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reading" DECIMAL NOT NULL,
    "recorded_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sensor_id" INTEGER NOT NULL
);
INSERT INTO "new_SensorReadings" ("id", "reading", "recorded_at", "sensor_id") SELECT "id", "reading", "recorded_at", "sensor_id" FROM "SensorReadings";
DROP TABLE "SensorReadings";
ALTER TABLE "new_SensorReadings" RENAME TO "SensorReadings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
