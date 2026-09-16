import cors from "cors"
import express from "express"
import { prisma } from "./prisma/prisma"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())

app.get('/', async (req, res) => {
  res.json({
    message: "Hi!"
  })
})

app.get('/api/sensors', async (req, res) => {
  console.log("RECEIVED PING FOR SENSORS!")

  let sensors = await prisma.sensor.findMany();
  console.log(sensors)

  res.status(200).json(sensors)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});