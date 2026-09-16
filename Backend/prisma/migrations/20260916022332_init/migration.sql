/*
  Warnings:

  - You are about to alter the column `activestate` on the `Sensor` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Boolean`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sensor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "temp" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "activestate" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Sensor" ("activestate", "id", "location", "name", "temp") SELECT "activestate", "id", "location", "name", "temp" FROM "Sensor";
DROP TABLE "Sensor";
ALTER TABLE "new_Sensor" RENAME TO "Sensor";
CREATE UNIQUE INDEX "Sensor_name_key" ON "Sensor"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
