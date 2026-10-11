import cors from "cors"
import bcrypt from "bcrypt"
import express from "express"
import { prisma } from "./prisma/prisma"
import { createServer } from "http";
import { WebSocketServer } from "ws"

import { startSensorSimulation } from "./util";

const PORT = process.env.PORT || 3000;

const app = express();
const server = createServer(app)

const wss = new WebSocketServer({server})
startSensorSimulation(wss)

app.use(cors())
app.use(express.json())

app.post('/api/auth/login', async (req, res) => {
    const { user, pass } = req.body

    const existingUser = await prisma.user.findFirst({
        where: { username: user }
    })

    const doPassWordsMatch = existingUser ? await bcrypt.compare(pass, existingUser.password) : false
    if (!existingUser || !doPassWordsMatch) {
        return res.status(401).json({error: "Invalid username or password."})
    }

    res.status(200).json({ok: true, user: existingUser})
})

app.get('/api/sensors', async (req, res) => {
    let sensors = await prisma.sensor.findMany();

    res.status(200).json(sensors)
})

app.get('/api/sensor/:id/readings', async (req, res) => {
    let readings = await prisma.sensorReadings.findMany({
        where: {
            sensor_id: Number(req.params.id)
        }
    })

    res.status(200).json(readings)
})

app.get('/api/sensors/all/readings', async (req, res) => {
    let readings = await prisma.sensorReadings.findMany()

    res.status(200).json(readings)
})

wss.on("connection", (socket) => {
    console.log("Connected to a client.")

    socket.send(JSON.stringify({
        type: "connection",
        message: "Connected to server!"
    }))

    socket.on("close", () => {
        console.log("Client disconnected.")
    })
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});