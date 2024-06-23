import { fetchProductos } from '@/app/lib/dataProductos';
import { Producto } from '@/app/lib/definitions';
import { NextResponse } from 'next/server';

export async function GET(){

    try{
    const series = await fetchProductos("serie");
    return NextResponse.json(series);
    }
    catch(error){
        return NextResponse.json({ error: 'Failed to fetch series data.' }, { status: 500 });
    }
}