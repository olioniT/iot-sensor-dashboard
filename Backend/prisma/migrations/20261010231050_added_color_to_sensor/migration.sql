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
    "created_by" INTEGER NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#000000'
);
INSERT INTO "new_Sensor" ("created_at", "created_by", "id", "location", "max_temperature", "min_temperature", "name", "status", "update_interval") SELECT "created_at", "created_by", "id", "location", "max_temperature", "min_temperature", "name", "status", "update_interval" FROM "Sensor";
DROP TABLE "Sensor";
ALTER TABLE "new_Sensor" RENAME TO "Sensor";
CREATE UNIQUE INDEX "Sensor_name_key" ON "Sensor"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
