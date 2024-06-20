'use client'

import EstadoPago from '@/app/ui/estadoPago'
import { useSearchParams } from "next/navigation"
import { Suspense } from 'react';

export default function Component(){


  return (
    <Suspense fallback={<div>Loading...</div>}>
        <CarritoPagoContent/>
    </Suspense>
  );
};

function CarritoPagoContent() {
  const paymentId = useSearchParams()?.get("payment_id") || "";    
  const status = useSearchParams()?.get("status") || ""; 
  return <EstadoPago paymentId={paymentId} status={status}/>
}