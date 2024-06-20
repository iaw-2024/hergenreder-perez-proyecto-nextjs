import { fetchProductos } from '@/app/lib/dataProductos';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest){

    try{
    const peliculas = await fetchProductos("pelicula");
    return NextResponse.json(peliculas, {status: 200});
    }
    catch(error){
        return NextResponse.json({ error: 'Failed to fetch peliculas data.' }, { status: 500 });
    }
}