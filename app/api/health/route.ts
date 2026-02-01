import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'RaziaTech MartFilliate',
    database: 'Supabase PostgreSQL',
    deployment: 'Vercel',
    version: '1.0.0'
  });
}
