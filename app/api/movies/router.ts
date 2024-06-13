import { NextResponse } from 'next/server';
import { fetchPeliculas } from '@/app/lib/dataFilms';

export async function GET() {
  try {
    const peliculas = await fetchPeliculas();
    return NextResponse.json(peliculas, { status: 200 });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to fetch peliculas data.' }, { status: 500 });
  }
}