'use client';

import { useEffect } from 'react';
import { MercadoPagoConfig, Payment as MercadoPagoPayment } from 'mercadopago';
import { savePaymentData } from './data';
import { Payment } from './definitions';

// Función para obtener la información del pago de MercadoPago y guardarla en la base de datos
const fetchAndSavePaymentInfo = async (paymentId: any) => {
  try {
    const client = new MercadoPagoConfig({ accessToken: 'APP_USR-7146316856995497-061914-375fb93c534095bd029cd746e0f553be-1860395964' });
    const payment = new MercadoPagoPayment(client);

    const paymentInfo = await payment.get({ id: paymentId });

    console.log(paymentInfo); 

    const formattedPaymentInfo: Payment = {
        id: paymentInfo.id ?? 0,
        status: paymentInfo.status ?? 'unknown',  
        payer: {
          id: paymentInfo.payer?.id ?? 'unknown', 
          email: paymentInfo.payer?.email ?? 'unknown@example.com',  
        },
        transaction_amount: paymentInfo.transaction_amount ?? 0
      };

    await savePaymentData(formattedPaymentInfo);
  } catch (error) {
    console.error('Error fetching or saving payment information:', error);
  }
};

export default function SavePaymentHandler (paymentId: any, status: any){
  useEffect(() => {
    if (status === 'approved') {
      fetchAndSavePaymentInfo(paymentId);
    }
  }, [status, paymentId]);

  return null;
};