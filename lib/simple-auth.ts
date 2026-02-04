// Simple auth for deployment (no NextAuth dependency)

const mockUsers = [
  { id: "1", email: "admin@raziatech.com", name: "Admin", role: "ADMIN", password: "admin123" },
  { id: "2", email: "affiliate@example.com", name: "Affiliate", role: "AFFILIATE", password: "password123" },
  { id: "3", email: "buyer@example.com", name: "Buyer", role: "BUYER", password: "password123" }
]

export async function signIn(email: string, password: string) {
  const user = mockUsers.find(u => u.email === email && u.password === password)
  return user ? { user, error: null } : { user: null, error: "Invalid credentials" }
}

export async function getServerSession() {
  // Mock session for development
  return { user: null }
}

export const auth = { getServerSession }
export const signOut = () => ({})
