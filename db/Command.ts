import { PrismaPromise } from '@prisma/client';

export interface Command<TResult = unknown> {
  execute: () => PrismaPromise<TResult>;
}
