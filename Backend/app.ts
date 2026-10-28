import cors from "cors"
import bcrypt from "bcrypt"
import express from "express"
import { prisma } from "./prisma/prisma"
import { createServer } from "http";
import { WebSocketServer } from "ws"

import { createSensor, createUser } from "./util";
import { startSensorSimulation } from "./util";

const PORT = process.env.PORT || 3000;

const app = express();
const server = createServer(app)

const wss = new WebSocketServer({server})
startSensorSimulation(wss)

app.use(cors())
app.use(express.json())

app.post('/api/auth/login', async (req, res) => {
    try {
        const { user, pass } = req.body
    
        const existingUser = await prisma.user.findFirst({
            where: { username: user }
        })
    
        const doPassWordsMatch = existingUser ? await bcrypt.compare(pass, existingUser.password) : false
        if (!existingUser || !doPassWordsMatch) {
            return res.status(401).json({error: "Invalid username or password."})
        }
    
        res.status(200).json({ok: true, user: existingUser})
    } catch (err) {
        res.status(500).json({error: err})
    }
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

app.post('/api/sensor/create', async (req, res) => {
    try {
        let { name, location, status, minTemp, maxTemp, updateInterval, createdBy } = req.body
    
        let existingSensor = await prisma.sensor.findFirst({
            where: { name: name }
        })

        if (existingSensor) {
            res.status(400).json({error: "Duplicate sensor name. Please change the name of your new sensor and try again."})
        }

        let newSensor = await createSensor(name, location, status, minTemp, maxTemp, updateInterval, createdBy)

        res.status(200).json({ ok: true, sensor: newSensor })
    } catch (error) {
        return res.status(500).json({error: "Unable to create new sensor. Please try again."})
    }
})

app.post('/api/sensor/:id/edit', async (req, res) => {
    let { id, name, status, color, location, minTemp, maxTemp, updateInterval } = req.body
    
    let existingSensor = await prisma.sensor.findFirst({
        where: {
            id: id,
        }
    });

    if (!existingSensor) { res.status(401).json({ error: "Invalid sensor ID. Please try again." }) }

    let last_edited = new Date().toISOString()
    const sensor = await prisma.sensor.update({
        where: { id: id },
            data: {
                name: name,
                location: location,
                status: status,
                color: color,
                min_temperature: minTemp,
                max_temperature: maxTemp,
                update_interval: updateInterval,
                last_edited: last_edited
            },
    });
    res.status(200).json({ ok: true, sensor })
})

app.post('/api/sensor/:id/delete', async (req, res) => {
    let { id } = req.body
    
    let existingSensor = await prisma.sensor.findFirst({
        where: { id: id }
    });

    console.log(id, existingSensor)
    
    if (!existingSensor) { res.status(401).json({ error: "Invalid sensor ID. Please try again." }) }

    await prisma.sensor.delete({
        where: { id: id },
    });

    res.status(200).json({ ok: true })
})

app.get('/api/users', async (req, res) => {
    let users = await prisma.user.findMany()

    res.status(200).json(users)
})

app.post('/api/user/create', async (req, res) => {
    try {
        let { name, username, password, role } = req.body
    
        let existingUser = await prisma.user.findFirst({
            where: { username: username }
        })

        if (existingUser) {
            res.status(400).json({error: "Duplicate sensor name. Please change the name of your new sensor and try again."})
        }

        let newUser = await createUser(name, username, password, role)

        res.status(200).json({ ok: true, user: newUser })
    } catch (error) {
        return res.status(500).json({error: "Unable to create new user. Please try again."})
    }
})

app.post('/api/user/:id/edit', async (req, res) => {
    let { id, name, username, newPassword, role } = req.body
    
    let existingUser = await prisma.user.findFirst({
        where: {
            id: id,
        }
    });

    if (!existingUser) { res.status(401).json({ error: "Invalid user ID. Please try again." }) }

    let last_edited = new Date().toISOString()
    let hashedPassword = await bcrypt.hash(newPassword, 10)

    const sensor = await prisma.user.update({
        where: { id: id },
            data: {
                name: name,
                username: username,
                password: hashedPassword,
                role: role,
                last_edited: last_edited
            },
    });
    res.status(200).json({ ok: true, sensor })
})

app.post('/api/user/:id/delete', async (req, res) => {
    let { id } = req.body
    
    console.log("USER ID:", id)

    let existingUser = await prisma.user.findFirst({
        where: { id: id }
    });
    
    if (!existingUser) { res.status(401).json({ error: "Invalid user ID. Please try again." }) }

    await prisma.user.delete({
        where: { id: id },
    });

    res.status(200).json({ ok: true })
})

app.get("/api/roles", async (req, res) => {
    let roles = await prisma.role.findMany()

    res.status(200).json(roles)
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