import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const startTime = Date.now();
    
    // Test database connection
    const dbResult = await prisma.$queryRaw`SELECT 1 as status`;
    const dbTime = Date.now() - startTime;
    
    // Get environment info (safe)
    const envInfo = {
      nodeEnv: process.env.NODE_ENV || 'development',
      vercelEnv: process.env.VERCEL_ENV || 'development',
      region: process.env.VERCEL_REGION || 'local',
    };

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: {
          status: 'connected',
          responseTime: `${dbTime}ms`,
          testQuery: dbResult,
        },
        api: {
          status: 'operational',
        },
      },
      environment: envInfo,
      version: '1.0.0',
      deployment: 'RaziaTech MartFilliate',
    });
    
  } catch (error: any) {
    console.error('Health check failed:', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      services: {
        database: {
          status: 'disconnected',
          error: error.message || 'Unknown database error',
        },
        api: {
          status: 'operational',
        },
      },
      error: 'Database connection failed',
    }, { status: 500 });
  }
}
