export async function DeleteSensor(prisma: any, id: any) {
    let count = await prisma.sensor.count({
    where: {
      id: id,
    }
    });
    if (count == 0) {
     return "Failed";
    }
    await prisma.sensor.delete({
          where: { id: id },
    });
    return "Success";
}

export async function DeleteUser(prisma: any, id: any) {
    let count = await prisma.user.count({
    where: {
      id: id,
    }
    });
    if (count == 0) {
     return "Failed";
    }
    await prisma.user.delete({
          where: { id: id },
    });
    return "Success";
}