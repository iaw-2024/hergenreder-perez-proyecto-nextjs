import { fetchAllProductos } from '@/app/lib/dataProductos';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(){

    try
    {
        const productos = await fetchAllProductos();
        return NextResponse.json(productos, {status: 200});
    }
    catch(error){
        return NextResponse.json({ error: 'Failed to fetch productos data.' }, { status: 500 });
    }
}