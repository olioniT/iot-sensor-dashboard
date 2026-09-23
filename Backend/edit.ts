export async function EditSensor(prisma: any, id: any, name: any, temp: any, location: any, activestate: any) {
    let count = await prisma.sensor.count({
    where: {
      id: id,
    }
    });
    if (count == 0) {
     return "Failed";
    }
  await prisma.sensor.update({
   where: { id: id },
   data: {
     name: name,
     temp: temp,
     location: location,
     activestate: activestate,
   },
  });
  return "Success";
}

export async function EditUser(prisma: any, id: any, name: any, admin: any, password: any) {
    let count = await prisma.user.count({
    where: {
      id: id,
    }
    });
    if (count == 0) {
     return "Failed";
    }
  await prisma.user.update({
   where: { id: id },
   data: {
      name: name,
      admin: admin,
      password: password,
   },
  });
  return "Success";
}