import { fetchUnProducto } from '@/app/lib/dataProductos';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    
    if (id === null) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    try {
        const producto = await fetchUnProducto(id);
        if (!producto) {
            return NextResponse.json({ error: 'Producto not found.' }, { status: 404 });
        }
        return NextResponse.json(producto, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch producto data.' }, { status: 500 });
    }
}

