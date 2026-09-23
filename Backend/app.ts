import express from "express"
import cors from "cors"
import { prisma } from "./prisma/prisma"
import { Sensors } from "./find"
import { Users } from "./find"
import { Sensor } from "./find"
import { User } from "./find"
import { CreateSensor } from "./create"
import { CreateUser } from "./create"
import { EditSensor } from "./edit"
import { EditUser } from "./edit"
import { DeleteSensor } from "./delete"
import { DeleteUser } from "./delete"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  let message = await Sensors(prisma);

  res.json({
    message: message
  })
})

app.get('/api/sensors', async (req, res) => {
  let message = await Sensors(prisma);

  res.json({
    message: message
  })
})

app.get('/api/users', async (req, res) => {
  let message = await Users(prisma);

  res.json({
    message: message
  })
})

app.post('/api/sensor', async (req, res) => {
  let { id } = req.body
  let message = await Sensor(prisma, id);
  //curl -X POST -H "Content-Type: application/json" -d '{"id": 1}' http://localhost:3000/test/sensor
  res.json({
    message: message
  })
})

app.post('/api/user', async (req, res) => {
  let { id } = req.body
  let message = await User(prisma, id);
  //curl -X POST -H "Content-Type: application/json" -d '{"id": 1}' http://localhost:3000/test/user
  res.json({
    message: message
  })
})

app.post('/api/createsensor', async (req, res) => {
  let { name,temperature,location,active } = req.body
  let message = await CreateSensor(prisma, name, temperature, location, active);
  //curl -X POST -H "Content-Type: application/json" -d '{"name": "NewOne","temperature": -13,"location": "Sky","active": true}' http://localhost:3000/api/createsensor
  res.json({
    message: message
  })
})

app.post('/api/createuser', async (req, res) => {
  let { name,admin,password } = req.body
  let message = await CreateUser(prisma, name, admin, password);
  //curl -X POST -H "Content-Type: application/json" -d '{"name": "Johnaniel","admin": false,"password": "Password1"}' http://localhost:3000/api/createuser
  res.json({
    message: message
  })
})

app.post('/api/editsensor', async (req, res) => {
    let { id,name,temperature,location,active } = req.body
  let message = await EditSensor(prisma, id, name, temperature, location, active);
  //curl -X POST -H "Content-Type: application/json" -d '{"id": 1,"name": "NewOne","temperature": -13,"location": "Sky","active": true}' http://localhost:3000/api/editsensor
  res.send({
    message
  })
})

app.post('/api/edituser', async (req, res) => {
    let { id,name,admin,password } = req.body
  let message = await EditUser(prisma, id, name, admin, password);
  //curl -X POST -H "Content-Type: application/json" -d '{"id": 1,"name": "Johnaniel","admin": false,"password": "Password1"}' http://localhost:3000/api/usersensor
  res.send({
    message
  })
})

app.post('/api/deletesensor', async (req, res) => {
    let { id } = req.body
  let message = await DeleteSensor(prisma, id);
  //curl -X POST -H "Content-Type: application/json" -d '{"id": 1}' http://localhost:3000/api/deletesensor
  res.send({
    message
  })
})

app.post('/api/deleteuser', async (req, res) => {
    let { id } = req.body
  let message = await DeleteUser(prisma, id);
  //curl -X POST -H "Content-Type: application/json" -d '{"id": 1}' http://localhost:3000/api/deleteuser
  res.send({
    message
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});