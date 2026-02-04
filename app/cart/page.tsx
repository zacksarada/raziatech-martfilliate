import { getServerSession } from 'next-auth';
import { authConfig as authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import CartClient from './CartClient';

async function getCartData(userId: string) {
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return cart;
  } catch (error) {
    console.error('Error fetching cart:', error);
    return null;
  }
}

export default async function CartPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to view your cart</h1>
          <a 
            href="/auth/signin" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  const cart = await getCartData(session.user.id);

  return <CartClient initialCart={cart} userId={session.user.id} />;
}