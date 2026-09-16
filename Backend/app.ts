import express from "express"
import { prisma } from "./prisma/prisma"
import { Sensors } from "./find";

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});