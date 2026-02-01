// Mock Prisma client
export const prisma = {
  user: {
    findUnique: async () => null,
    findMany: async () => []
  },
  product: {
    findMany: async () => [],
    findUnique: async () => null
  }
}
