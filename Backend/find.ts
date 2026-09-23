export async function Sensors(prisma: any) {
  const allSensors = await prisma.sensor.findMany();
  return allSensors;
}

export async function Users(prisma: any) {
  const allUsers = await prisma.user.findMany();
  return allUsers;
}

export async function Sensor(prisma: any, id: any) {
let count = await prisma.sensor.count({
    where: {
      id: id,
    }
  });
  let sensor = await prisma.sensor.findMany({
    where: {
      id: id,
    },
  });
  if (count == 0) {
    let sensor = null;
  }
  return sensor;
}

export async function User(prisma: any, id: any) {
let count = await prisma.user.count({
    where: {
      id: id,
    }
  });
  let user = await prisma.user.findMany({
    where: {
      id: id,
    },
  });
  if (count == 0) {
    let user = null;
  }
  return user;
}