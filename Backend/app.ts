import express from "express"
import { prisma } from "./prisma/prisma"
import { Sensors } from "./find"
import { Sensor } from "./find"
import { CreateSensor } from "./create"

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  let sensors = await Sensors(prisma);

  res.json({
    message: sensors
  })
})

app.get('/api/sensors', async (req, res) => {
  let sensors = await Sensors(prisma);

  res.json({
    message: sensors
  })
})

app.get('/api/sensor', async (req, res) => {
  let sensors = await Sensor(prisma, 1);

  res.json({
    message: sensors
  })
})

app.get('/api/createsensor', async (req, res) => {
  let sensors = await CreateSensor(prisma, "Non-unique identifier", 18, "House", false);

  res.json({
    message: sensors
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});