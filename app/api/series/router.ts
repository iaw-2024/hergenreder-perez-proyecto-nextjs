import { NextResponse } from 'next/server';
import { fetchseries } from '@/app/lib/dataSeries';

export async function GET() {
  try {
    const peliculas = await fetchseries();
    return NextResponse.json(peliculas, { status: 200 });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to fetch peliculas data.' }, { status: 500 });
  }
}