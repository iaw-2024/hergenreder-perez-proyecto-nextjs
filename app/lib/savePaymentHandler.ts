"use server"
import { MercadoPagoConfig, Payment as MercadoPagoPayment } from 'mercadopago';
import { Payment } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';
import { sql } from '@vercel/postgres';
  
async function insertTransactions(payment: Payment|null) {
  noStore();
  console.log(payment);
  try {
    const insert = await sql<Payment>`
        INSERT INTO transactions (id, status, payer_id, payer_email, amount)
        VALUES (${payment?.id}, ${payment?.status}, ${payment?.payer?.id}, ${payment?.payer?.email}, ${payment?.transaction_amount})
        ON CONFLICT (id) DO NOTHING;
       `;
    
  console.log("Producto added: " + payment?.id);
  return insert;
  } catch (error) {
    console.error('Database Error:', error);
    return error;
  }
}

async function insertItemsTransactions(payment: Payment|null) {
  noStore();
  console.log(payment);
  try {
    const insert = payment?.items.map(item => {
      return sql<Payment>`
          INSERT INTO items_transactions (id_compra, idItem, title, unit_price)
          VALUES (${payment?.id}, ${item.id}, ${item.title}, ${item.unit_price})
          ON CONFLICT (id_compra, idItem) DO NOTHING;
      `;
  });
    
  console.log("Producto added: " + payment?.id);
  return insert;
  } catch (error) {
    console.error('Database Error:', error);
    return error;
  }
}

async function getPaymentInfo(paymentId: string) {
  try {
    const client = new MercadoPagoConfig({ accessToken: 'APP_USR-7146316856995497-061914-375fb93c534095bd029cd746e0f553be-1860395964' });
    const payment = new MercadoPagoPayment(client);

    const paymentInfo = await payment.get({ id: paymentId });

    const formattedPaymentInfo: Payment = {
        id: paymentInfo.id ?? 0,
        status: paymentInfo.status ?? 'unknown',  
        payer: {
          id: paymentInfo.payer?.id ?? 'unknown', 
          email: paymentInfo.payer?.email ?? 'unknown@example.com',  
        },
        transaction_amount: paymentInfo.transaction_amount ?? 0,
        items: paymentInfo.additional_info?.items?.map((item: any) => ({
          id: item.id,
          title: item.title,
          unit_price: item.unit_price
        })) ?? [{ id: 'unknown', title: 'unknown', unit_price: 0 }],
      };

    return formattedPaymentInfo;
  } catch (error) {
    console.error('Error fetching or saving payment information:', error);
    return null;
  }
};

export default async function SavePaymentHandler (paymentId : string, status:string) {
    if (status === 'approved') {
      const formData:Payment|null = await getPaymentInfo(paymentId);
      await insertTransactions(formData);
      await insertItemsTransactions(formData);
    }
  };