import { MercadoPagoConfig, Preference } from "mercadopago";
import { NextRequest, NextResponse } from 'next/server';
import { Producto } from "@/app/lib/definitions";

export async function POST(request: NextRequest) {
  try {
    // Read and log the raw request body once
    const requestBody = await request.text();

    // Parse the request body
    const products:Producto[] = await JSON.parse(requestBody).items;

    // Initialize MercadoPago client
    const client = new MercadoPagoConfig({ accessToken: 'APP_USR-7146316856995497-061914-375fb93c534095bd029cd746e0f553be-1860395964' });
    
    // Map products to MercadoPago items format
    const items = products.map((product)=>({
      id: product.id,
      title: product.title,
      unit_price: Number(product.price),
      quantity: 1,
      currency_id: "ARS"
    }));
    
    // Create preference
    const preference = new Preference(client);
    const response = await preference.create({
      body:{
         items: items
      }
    });
    
   return NextResponse.json({ id: response.id });
  } catch (error) {
    console.error("Error creating preference:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
