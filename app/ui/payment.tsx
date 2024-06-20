"use client"

import React, { useState, useEffect, Suspense} from 'react';
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react';
import { obtenerProductos } from '../lib/data';


initMercadoPago('APP_USR-62910eb0-6930-48a2-b47c-a87204a8a574');

export  default function Payment({listaProductos}:{listaProductos: RegExpMatchArray}){
  const [preferenceId, setPreferenceId ] = useState<string | null>(null);

  useEffect(() => {
    // Reset preferenceId to null whenever the component is mounted
    setPreferenceId(null);
  }, []);

  const createPreference = async () => {
    const lis = await obtenerProductos(listaProductos);
    try {
      const response = await fetch('./api/create_preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({items: lis})
      });

      const data = await response.json();
      setPreferenceId(data.id);
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
        <div id="wallet_container">
          <div className="mt-6">
            <Wallet initialization={{ preferenceId: preferenceId}} />
          </div>
        </div>
      )}
    </div>
  );
};