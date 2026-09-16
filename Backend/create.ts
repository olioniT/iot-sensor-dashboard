export async function CreateSensor(prisma: any, name: any, temp: any, location: any, activestate: any) {
  const sensor = await prisma.sensor.create({
    data: {
      name: name,
      temp: temp,
      location: location,
      activestate: activestate,
    },
  });
  return "All good!";
}