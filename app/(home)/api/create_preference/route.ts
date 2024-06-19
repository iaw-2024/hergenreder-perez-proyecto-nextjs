import {MercadoPagoConfig, Preference} from "mercadopago"
import { Producto } from "@/app/lib/definitions";

export async function POST(request: Request) {

    const { products } = await request.json();

    const client = new MercadoPagoConfig({accessToken: process.env.MP_ACCESS_TOKEN!});

    const items = products.map((product: { id: any; title: any; price: any; }) => ({
        id: product.id,
        title: product.title,
        unit_price: Number(product.price),
        quantity: 1,
        currency_id: "ARS"
      }));
    
    const preference = new Preference(client);

    const response = await preference.create({
        body: {
          items: items,
        }
      })
    
    console.log(response.id);
    Response.json({id: response.id});
}