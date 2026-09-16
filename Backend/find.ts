export async function Sensors(prisma: any) {
  // Fetch all users with their posts
  // const allUsers = await prisma.user.findMany();
  const allSensors = await prisma.sensor.findMany();

  //console.log("All sensors:", JSON.stringify(allSensors, null, 2));
  //console.log("All users:", JSON.stringify(allUsers, null, 2));
  return allSensors;
}

export async function Sensor(prisma: any, id: any) {
  const Sensor = await prisma.sensor.findMany({
    where: {
      id: id,
    },
  });
  return Sensor;
}