import { prisma } from "./prisma/prisma";

async function main() {
const newUser = await prisma.user.create({
  data: {
    name: "Alice",
    email: "alice6@prisma.io",
  },
});
const users = await prisma.user.findMany();
console.log(users);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });