import "dotenv/config";
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
    await prisma.user.create({
        data: {
            name: name,
            username: username,
            password: password,
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
    const timestamp = new Date().toISOString()
    const date = timestamp.split("T")[0]
    const time = `${Number(timestamp.split("T")[1].split(".")[0].slice(0, 2)) + 12}:${timestamp.split("T")[1].split(".")[0].slice(3, 5)}`
    const datetime = `${date} ${time}`

    await prisma.sensor.create({
        data: {
            name: name,
            location: location,
            status: status,
            min_temperature: minTemp,
            max_temperature: maxTemp,
            update_interval: updateInterval,
            created_at: datetime,
            created_by: createdBy
        }
    })
}

async function createReadings(sensorReadings: {reading: number, sensorID: number}[]) {
    const timestamp = new Date().toISOString()
    const date = timestamp.split("T")[0]
    const time = `${Number(timestamp.split("T")[1].split(".")[0].slice(0, 2)) + 12}:${timestamp.split("T")[1].split(".")[0].slice(3, 5)}`
    const datetime = `${date} ${time}`

    sensorReadings.forEach(async (sensorReading) => {
        await prisma.sensorReadings.create({
            data: {
                reading: sensorReading.reading,
                recorded_at: datetime,
                sensor_id: sensorReading.sensorID
            }
        })
    })
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

    await createSensor("Central Sensor", "Main Office", "active", 15, 25, 30, 1)
    await createSensor("Cubicle - 1", "Cubicle Offices", "active", 15, 25, 30, 1)
    await createSensor("Cubicle - 2", "Cubicle Offices", "active", 15, 25, 30, 1)
    await createSensor("Cubicle - 3", "Cubicle Offices", "inactive", 15, 25, 30, 1)
    await createSensor("Front Door", "Reception", "active", 15, 25, 30, 2)

    await createReadings([
        {reading: 20.0, sensorID: 1},
        {reading: 20.8, sensorID: 2},
        {reading: 21.9, sensorID: 3},
        {reading: 19.5, sensorID: 4},
        {reading: 21.0, sensorID: 5},
    ])
}

main().catch(console.error).finally(() => prisma.$disconnect())