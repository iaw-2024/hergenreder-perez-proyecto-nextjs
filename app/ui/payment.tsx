"use client"

import React, { useState } from 'react';
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react';
import { obtenerProductos } from '../lib/data';
import Swal from 'sweetalert2';
import ReactDOM from 'react-dom/client';
import { Button } from './button';

initMercadoPago('APP_USR-62910eb0-6930-48a2-b47c-a87204a8a574');

export default function Payment({ listaProductos }: { listaProductos: RegExpMatchArray }) {
  const [loging, setLoging] = useState(false);

  const createPreference = async () => {
    setLoging(true);
    const lis = await obtenerProductos(listaProductos);
    try {
      const response = await fetch('./api/create_preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: lis })
      });

      const data = await response.json();
      const MySwal = Swal;
      
      // Función para mostrar la alerta con el componente de React
      MySwal.fire({
        title: 'Pagar con Mercado Libre',
        html: '<div id="wallet-container"></div>',
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: false,
        color: "#FFFFFF",
        background: "#0F1A2F",
        cancelButtonColor: "#3085d6",
        didOpen: () => {
          const root = ReactDOM.createRoot(document.getElementById('wallet-container')!);
          // Renderiza el componente React en el contenedor HTML de SweetAlert2
          root.render(
            <>
              {lis?.map((porducto) => <p key={porducto?.id}>{porducto?.title} - ${porducto?.price}</p>)}
              <Wallet initialization={{ preferenceId: data.id }} />
            </>,
          );
        },
        willClose: () => {
          const root = ReactDOM.createRoot(document.getElementById('wallet-container')!);
          setLoging(false);
          // Limpia el contenedor HTML cuando la alerta se cierra
          const walletContainer = document.getElementById('wallet-container');
          if (walletContainer) {
            root.unmount();
          }
        }
      });
    } catch (error) {
      console.error('Error creating preference:', error);
    }
  };

  return (
    <div>
      <Button onClick={createPreference} className="mt-4 w-full" aria-disabled={loging}>
        Pagar
      </Button>
    </div>
  );
};