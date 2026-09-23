export async function CreateSensor(prisma: any, name: any, temp: any, location: any, activestate: any) {
  let count = await prisma.sensor.count({
    where: {
      name: name,
    }
  });
  if (count == 1) {
    return "Failed";
  }
  await prisma.sensor.create({
    data: {
      name: name,
      temp: temp,
      location: location,
      activestate: activestate,
    },
  });
  return "Success";
}

export async function CreateUser(prisma: any, name: any, admin: any, password: any) {
  await prisma.sensor.create({
    data: {
      name: name,
      admin: admin,
      password: password,
    },
  });
  return "Success";
}