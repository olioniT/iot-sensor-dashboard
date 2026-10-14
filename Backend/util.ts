import { WebSocketServer } from "ws"
import { prisma } from "./prisma/prisma";

interface SensorReading {
    sensor_id: number;
    reading: number;
    recorded_at: string;
}

async function broadcast(wss: WebSocketServer, data: any) {
    if (!wss) return;

    console.log(data)

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