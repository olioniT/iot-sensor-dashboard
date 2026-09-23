import cors from "cors"
import express from "express"
import { prisma } from "./prisma/prisma"

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.json({
    message: "Hi!"
  })
})

app.get('/api/sensors', async (req, res) => {
  let sensors = await prisma.sensor.findMany();
  console.log(sensors)

  res.status(200).json(sensors)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});