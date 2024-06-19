import { NextResponse } from 'next/server';
import { fetchUnProducto } from '@/app/lib/dataProductos';

export async function GET({ params }:{params:{id: string}}) {
  try {
    const peliculas = await fetchUnProducto(params.id);
    return NextResponse.json(peliculas, { status: 200 });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to fetch peliculas data.' }, { status: 500 });
  }
}