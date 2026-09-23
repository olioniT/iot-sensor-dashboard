-- CreateTable
CREATE TABLE "TemperatureReadings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "temperature" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "time" TEXT NOT NULL
);
