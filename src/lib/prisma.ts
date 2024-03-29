import { Client } from '@planetscale/database';
import { PrismaPlanetScale } from '@prisma/adapter-planetscale';
import { PrismaClient } from '@prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;

const client = new Client({ url: connectionString });
const adapter = new PrismaPlanetScale(client);
export const prisma = new PrismaClient({ adapter });
