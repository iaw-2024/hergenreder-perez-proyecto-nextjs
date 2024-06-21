import Link from "next/link";
import { Button, ButtonDeleteCart } from "./button";
import { Payment } from "../lib/definitions";
import { useState } from "react";

export default async function EstadoPago({ paymentId, status }: { paymentId: string, status: string }) {

    const [paymentToShow, insertPayment] = useState<Payment|null>(null);

    const checkPayment = async (paymentId: any) => {

        try{
            const response = await fetch("api/payment_info/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentId: paymentId
                })
            })
            let infoPayment = await response.json(); 
            let payment : Payment = {
                id: infoPayment.id,
                date_created: infoPayment.date_created,
                date_approved: infoPayment.date_approved,
                date_last_updated: infoPayment.date_last_updated,
                money_release_date: infoPayment.money_release_date,
                payment_method_id: infoPayment.payment_method_id,
                payment_type_id: infoPayment.payment_type_id,
                status: infoPayment.status,
                status_detail: infoPayment.status_detail,
                currency_id: infoPayment.currency_id,
                description: infoPayment.description,
                collector_id: infoPayment.collector_id,
                payer: {
                    id: infoPayment.payer.id,
                    email: infoPayment.payer.email,
                    identification: {
                        type: infoPayment.payer.identification.type,
                        number: infoPayment.payer.identification.number
                    }
                }
            }

            console.log(payment);
            insertPayment(payment);
        }
        catch(error){

        }
    }

    return (
        <div className="text-white bg-gray-950 shadow-sm rounded-lg max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold">Pago {status}</h2>
            <div className="flex items-center p-6">
                <div className="text-gray-400 justify-center">
                    <h1 className="text-l font-bold">Detalle de pago:</h1>
                    <div className="px-6">
                        <p>ID de Pago: {paymentToShow?.id}</p>
                        <p>Estado: {paymentToShow?.status}</p>    
                        <p>email: {paymentToShow?.payer.email}</p>    
                    </div>
                </div>    
            </div>
            <div className="flex justify-end">
            {status==="approved" && <ButtonDeleteCart/>}
            {status==="rejected" && <Button><Link href="/carrito">go back</Link></Button>}
            </div>
        </div>
    )
}
