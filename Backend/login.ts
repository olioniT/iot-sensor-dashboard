export async function Login(prisma: any, username: any, password: any) {
    if (await prisma.users.count({
        where: {
            username: username,
            password: password,
        }
    }) == 0 ) {
        return "Failed";
    }
    let User = await prisma.users.findFirst({
        where: {
            username: username,
            password: password,
        }
    });
    //Needs much work
    return "Success";
}