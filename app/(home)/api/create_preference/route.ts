import { MercadoPagoConfig, Preference } from "mercadopago";
import { NextRequest, NextResponse } from 'next/server';
import { Producto } from "@/app/lib/definitions";

export async function POST(request: NextRequest) {
  try {
    // Read and log the raw request body once
    const requestBody = await request.text();
    console.log("Request body: " + requestBody);

    // Parse the request body
    const productos = JSON.stringify(requestBody);
    const products:Producto[] = await JSON.parse(requestBody).items;

    // Initialize MercadoPago client
    const client = new MercadoPagoConfig({ accessToken: 'APP_USR-443959311524372-061510-3dbca843e1cb69e1b5f7598ab98f323c-1000398139' });
    
    //console.log("Request body: " + requestBody);
    console.log("Request body: " + products);
    // Map products to MercadoPago items format
    const items = [{
      id: products[0].id,
      title: products[0].title,
      unit_price: Number(products[0].price),
      quantity: 1,
      currency_id: "ARS"
    }];

    console.log("Items: " + JSON.stringify(items));
    
    // Create preference
    const preference = new Preference(client);
    const response = await preference.create({
      body:{
         items: items
      }
    });

    console.log("Preference ID: " + response.id);

    // Return the response
    return NextResponse.json({ id: response.id });
  } catch (error) {
    console.error("Error creating preference:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
