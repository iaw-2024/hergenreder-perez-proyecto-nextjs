'use client'

import EstadoPago from '@/app/ui/estadoPago'
import {useSearchParams } from "next/navigation"
import { Suspense } from 'react';

export default async function Component(){
const paymentId = useSearchParams()?.get("payment_id") || "";    
const status = useSearchParams()?.get("status") || ""; 

  return (
    <Suspense>
        <EstadoPago paymentId={paymentId} status={status}/>
    </Suspense>
  );
};