import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create Prisma client with error handling
let prismaInstance: PrismaClient;

try {
  prismaInstance = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
} catch (error) {
  console.error('Failed to create Prisma client:', error);
  // Fallback to a mock client for development
  prismaInstance = {
    user: {
      findUnique: async () => null,
      create: async (data: any) => data.data,
      findMany: async () => []
    },
    product: {
      findMany: async () => [],
      findUnique: async () => null
    },
    category: {
      findMany: async () => []
    },
    $disconnect: async () => {}
  } as any;
}

export const prisma = globalForPrisma.prisma ?? prismaInstance

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
