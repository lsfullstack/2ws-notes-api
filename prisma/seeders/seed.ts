import { PrismaClient } from '@prisma/client'
import { UsersSeeders } from './UsersSeeders';
import { NotesSeeders } from './NotesSeeder';

const prisma = new PrismaClient();

const seeders = [
  UsersSeeders,
  NotesSeeders,
]
const run = async () => {
  seeders.map(async (seeder) => {
    await seeder();
  })
}

run()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });
