import "dotenv/config";
import bcrypt from "bcrypt"
import { prisma } from "./prisma";

async function createRole(
    name: string,
    description: string
) {
    await prisma.role.create({
        data: {
            name: name,
            description: description
        }
    })
}

async function createUser( 
    name: string, 
    username: string, 
    password: string, 
    role: number
) {
    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
        data: {
            name: name,
            username: username,
            password: hashedPassword,
            role: role,
        },
    });
}

async function createSensor(
    name: string,
    location: string,
    status: string,
    minTemp: number,
    maxTemp: number,
    updateInterval: number,
    createdBy: number
) {
    const chartColors = [ "#2563eb", "#f97316", "#10b981", "#e11d48", "#8b5cf6", "#eab308", "#06b6d4", "#ec4899", "#64748b", "#84cc16"];

    const timestamp = new Date().toISOString()
    const date = timestamp.split("T")[0]
    const time = `${Number(timestamp.split("T")[1].split(".")[0].slice(0, 2)) + 12}:${timestamp.split("T")[1].split(".")[0].slice(3, 5)}`
    const datetime = `${date} ${time}`
    const color = chartColors[Math.floor(Math.random() * chartColors.length)]

    await prisma.sensor.create({
        data: {
            name: name,
            location: location,
            status: status,
            min_temperature: minTemp,
            max_temperature: maxTemp,
            update_interval: updateInterval,
            created_at: datetime,
            created_by: createdBy,
            color: color
        }
    })
}

async function generateHistoricalReadings(sensorIDs: number[], intervalMinutes = 10) {
    const now = Date.now()
    const windowMs = 24 * 60 * 60 * 1000
    const stepMs = intervalMinutes * 60 * 1000

    const data: { sensor_id: number; reading: number; recorded_at: Date }[] = []

    for (const sensor_id of sensorIDs) {
        let temperature = 20 + Math.random() * 10

        for (let t = now - windowMs; t <= now; t += stepMs) {
            temperature = Math.min(30, Math.max(20, temperature + (Math.random() - 0.5) * 2))

            data.push({
                sensor_id,
                reading: Math.round(temperature * 10) / 10,
                recorded_at: new Date(t)
            })
        }
    }

    await prisma.sensorReadings.createMany({ data })
}

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