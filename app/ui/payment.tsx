"use client"

import React, { useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { Producto } from '../lib/definitions';

initMercadoPago('APP_USR-c4f74256-b19b-431f-8f27-36d0be2cd555');

const Payment = ({ productos }: { productos: Producto[] }) => {
  const [preferenceId, setPreferenceId ] = useState<string | null>(null);
  const createPreference = async () => {
    try {
      const response = await fetch('/api/create_preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({items: productos})
      });

      const data = await response.text();
      console.log(data);
      setPreferenceId(data);
    } catch (error) {
      console.error('Error creating preference:', error);
    }
  };

  return (
    <div>
      <button onClick={createPreference} className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Pagar
      </button>
      {preferenceId!==null && (
        //<div id="wallet_container">
          <div className="mt-6">
          <Wallet initialization={ {preferenceId: preferenceId} } />
          </div>
        //</div>
        
      )}
    </div>
  );
};

export default Payment;
