import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

const notes = [
  {
    uuid: 'ddc96269-2199-4a28-896e-90bf2d289fd6',
    description: 'My first note',
  },
  {
    uuid: '2bad3502-ba00-449b-a286-4b272b5a9dcd',
    description: 'My second note',
  },
];

const user =   {
  name: 'Felipe',
  email: 'felipe@prisma.io',
  password: '12345678',
}

export async function NotesSeeders() {
  notes.map(async (note) => {
    const { uuid, description } = note;
    const { name, email, password } = user;

    const hashedPassword = await hash(password, 6);

    await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const find_user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!find_user) {
      throw new Error('User not found');
    }

    await prisma.note.upsert({
      where: {
        uuid,
      },
      update: {},
      create: {
        description,
        user_uuid: find_user.uuid,
      },
    });

    console.log("Note created");
  });
}
