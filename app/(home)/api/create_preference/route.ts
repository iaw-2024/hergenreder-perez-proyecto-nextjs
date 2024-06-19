import {MercadoPagoConfig, Preference} from "mercadopago"
import { Producto } from "@/app/lib/definitions";

export async function POST(request: Request) {

    const { products } = await request.json();

    const client = new MercadoPagoConfig({accessToken: process.env.MP_ACCESS_TOKEN!});

    const items = products.map((product: { id: any; title: any; price: any; quantity: any; }) => ({
        id: product.id,
        title: product.title,
        unit_price: Number(product.price),
        quantity: Number(product.quantity),
        currency_id: "ARS"
      }));
    
    const preference = new Preference(client);

    const response = await preference.create({
        body: {
            payment_methods: {
            /*excluded_payment_methods: [
                    {
                                id: "argencard"
                    },
                    {
                                id: "cabal"
                    },
                    {
                                id: "cmr"
                    },
                    {
                                id: "cencosud"
                    },
                    {
                                id: "cordobesa"
                    },
                    {
                                id: "diners"
                    },
                    {
                                id: "naranja"
                    },
                    {
                                id: "debcabal"
                    },
                    {
                                id: "maestro"
                    }
            ],
        excluded_payment_types: [],
        installments: 1*/
        },
          items: items,
        }
      })
    
    console.log(response.id);
    Response.json({id: response.id});
}