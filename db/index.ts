import { PrismaClient } from '@prisma/client';
import { IS_PROD } from 'utils/const';

let db: PrismaClient;

if (IS_PROD) {
  db = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  db = global.prisma;
}

export { db };
