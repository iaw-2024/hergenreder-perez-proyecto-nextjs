import MercadoPagoConfig from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    
    const requestBody = await request.text();

    const paymentID = await JSON.parse(requestBody).paymentID;

    const url = "https://api.mercadopago.com/v1/payments/" + paymentID;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Authorization: Bearer APP_USR-7146316856995497-061914-375fb93c534095bd029cd746e0f553be-1860395964'
        }
    });

    return NextResponse.json({response}, {status: 200});
}