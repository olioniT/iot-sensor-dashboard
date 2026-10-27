import bcrypt from "bcrypt"
import { WebSocketServer } from "ws"
import { prisma } from "./prisma/prisma";
import { Decimal } from "@prisma/client/runtime/client";

interface SensorReading {
    sensor_id: number;
    reading: number;
    recorded_at: string;
}

interface Sensor {
    name: string;
    location: string;
    status: string;
    min_temperature: Decimal;
    max_temperature: Decimal;
    update_interval: number;
    last_edited: Date;
    created_at: Date;
    created_by: number;
    color: string;
}

export async function createRole(
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

export async function createUser( 
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

export async function createSensor(
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
    
    const color = chartColors[Math.floor(Math.random() * chartColors.length)]

    const sensor = await prisma.sensor.create({
        data: {
            name: name,
            location: location,
            status: status,
            min_temperature: minTemp,
            max_temperature: maxTemp,
            update_interval: updateInterval,
            last_edited: timestamp,
            created_at: timestamp,
            created_by: createdBy,
            color: color
        }
    })

    return sensor
}

export async function generateHistoricalReadings(sensorIDs: number[], intervalMinutes = 10) {
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

export async function broadcast(wss: WebSocketServer, data: any) {
    if (!wss) return;

    await prisma.sensorReadings.createMany({ data })

    wss.clients.forEach(client => {
        if (client.readyState === client.OPEN) {
            client.send(JSON.stringify({
                type: "sensor-readings",
                message: data
            }))
        }
    })
}

export async function startSensorSimulation(wss: WebSocketServer) {
    setInterval(async () => {
        let readings: SensorReading[] = []
        const sensors = await prisma.sensor.findMany()

        sensors.forEach((sensor) => {
            if (sensor.status === "active") {
                let reading = {
                    sensor_id: sensor.id,
                    reading: Math.floor(Math.random() * (Number(sensor.max_temperature) - Number(sensor.min_temperature)) + Number(sensor.min_temperature)),
                    recorded_at: new Date().toISOString(),
                }
                readings.push(reading)
            }
        })


        await broadcast(wss, readings)
    }, 60000)
}