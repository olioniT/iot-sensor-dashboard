import "dotenv/config";
import { prisma } from "./prisma";

import { createRole, createUser, createSensor, generateHistoricalReadings } from "../util";

async function main() {
    await prisma.role.deleteMany({})
    await prisma.user.deleteMany({})
    await prisma.sensor.deleteMany({})
    await prisma.sensorReadings.deleteMany({})

    await createRole("Admin", "Top-level user that can create/delete users and sensors.")
    await createRole("User", "Default client that has limited access and interaction to the dashboard.")

    await createUser("Olioni", "22358326", "password", 1)
    await createUser("Dillon", "25377610", "password", 1)
    await createUser("John", "00000001", "password", 2)

    await createSensor("Central Sensor", "Main Office", "active", 15, 25, 30, 1)
    await createSensor("Cubicle - 1", "Cubicle Offices", "active", 15, 25, 30, 1)
    await createSensor("Cubicle - 2", "Cubicle Offices", "active", 15, 25, 30, 1)
    await createSensor("Cubicle - 3", "Cubicle Offices", "inactive", 15, 25, 30, 1)
    await createSensor("Front Door", "Reception", "active", 15, 25, 30, 2)

    await generateHistoricalReadings([1, 2, 3, 4, 5])
}

main().catch(console.error).finally(() => prisma.$disconnect())