import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt';
const prisma = new PrismaClient();

const users = [
  {
    name: 'Admin',
    email: 'admin@prisma.io',
    password: '12345678',
    is_admin: true,
  },
  {
    name: 'Lucas',
    email: 'lucas@prisma.io',
    password: '12345678',
    is_admin: true,
  },
]

export async function UsersSeeders() {
  users.map(async (user) => {
    const { name, email, password, is_admin = false } = user;

    const hashedPassword = await hash(password, 6);

    await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        name,
        email,
        password: hashedPassword,
        is_admin,
      },
    });
    console.log("User created");
  });
}
