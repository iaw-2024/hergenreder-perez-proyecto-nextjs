import { NextResponse } from 'next/server';
import { fetchUnaPelicula } from '@/app/lib/dataFilms';

export async function GET({ params }:{params:{title: string}}) {
  try {
    const peliculas = await fetchUnaPelicula(params.title);
    return NextResponse.json(peliculas, { status: 200 });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to fetch peliculas data.' }, { status: 500 });
  }
}
