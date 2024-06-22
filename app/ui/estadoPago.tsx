import Link from "next/link";
import { Button, ButtonDeleteCart } from "./button";
import SavePaymentHandler from "../lib/savePaymentHandler";

export default async function EstadoPago({ paymentId, status }: { paymentId: string, status: string }) {

    return (
        <div className="text-white bg-gray-950 shadow-sm rounded-lg max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold">Pago {status}</h2>
            <div className="flex items-center p-6">
                <div className="text-gray-400 justify-center">
                    <h1 className="text-l font-bold">Detalle de pago:</h1>
                    <div className="px-6">
                        <p>ID de Pago: {paymentId}</p>
                        <p>Estado: {status}</p>
                    </div>
                </div>    
            </div>
            <div className="flex justify-end">
            {status==="approved" && <ButtonDeleteCart/>}
            {status==="rejected" && <Button><Link href="/carrito">go back</Link></Button>}
            </div>
            {status === 'approved' && <SavePaymentHandler paymentId={paymentId} status={status} />}
        </div>
    )
}
