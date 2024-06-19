"use client"

import React, { useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { Producto } from '../lib/definitions';

initMercadoPago('APP_USR-7f442d04-e853-40da-b794-5febfed8cf87', { locale: 'es-AR' });

const Payment = ({ productos }: { productos: Producto[] }) => {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  const createPreference = async () => {
    try {
      const response = await fetch('/api/create_preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({items: productos})
      });
      const data = await response.json();
      setPreferenceId(data.preferenceId);
    } catch (error) {
      console.error('Error creating preference:', error);
    }
  };

  return (
    <div>
      <button onClick={createPreference} className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Pagar
      </button>
      {preferenceId && (
        <div className="mt-6">
          <Wallet initialization={{ preferenceId }} />
        </div>
      )}
    </div>
  );
};

export default Payment;
