import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from '../generated/prisma/client.js';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({
  adapter
});
// console.log(Object.keys(prisma));
async function main() {
  // upsert plutôt que create : le seed reste rejouable sans dupliquer les données
  await prisma.airport.upsert({
    create: { iataCode: 'CDG', name: 'Charles de Gaulle', city: 'Paris', country: 'France' },
    update: {},
    where: { iataCode: 'CDG' },
  });
  await prisma.airport.upsert({
    create: { iataCode: 'BRU', name: 'Brussels Airport', city: 'Bruxelles', country: 'Belgique' },
    update: {},
    where: { iataCode: 'BRU' },
  });
  await prisma.airport.upsert({
    create: { iataCode: 'JFK', name: 'John F. Kennedy', city: 'New York', country: 'États-Unis' },
    update: {},
    where: { iataCode: 'JFK' },
  });

  await prisma.airline.upsert({
    create: { icaoCode: 'AFR', name: 'Air France', country: 'France', foundedIn: 1933 },
    update: {},
    where: { icaoCode: 'AFR' },
  });

  console.log('✅ Seed terminé');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });