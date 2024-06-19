"use client"

import React, { useEffect } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { Producto } from '../lib/definitions';

export default function Payment(props: {listaProducto: Producto[]}){
    useEffect(() => {
      initMercadoPago('APP_USR-7f442d04-e853-40da-b794-5febfed8cf87', { locale: 'es-AR' });
    }, []);

    /*const fetchPreference = async () => {
      try {
        const response = await fetch('/api/create_preference', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productoLista }),
        });
    
        if (!response.ok) {
          throw new Error('Failed to create preference');
        }
    
        const data = await response.json();
        console.log(data.id);
        console.log(data);
        return data.id;
      } catch (error) {
        console.log(error);
      }
    };*/

    let preference_id: string = "";

    console.log(props.listaProducto);

    async function fetchear() {
      console.log("estamos adentro de tu hermana");
    try {
      const response = await fetch('/api/create_preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( props.listaProducto ),
      });

      console.log(props.listaProducto);
  
      if (!response.ok) {
        throw new Error('Failed to create preference');
      }
  
      const data = response.json();
      console.log("===================================");
      console.log("===================================");
      console.log("===================================");
      console.log(response);
      console.log(data);
      preference_id = data;
      console.log("===================================");
      console.log("===================================");
      console.log("===================================");
    } catch (error) {
      console.log(error);
    }
  } fetchear();
  

    return (
      <div>
        <Wallet initialization={{preferenceId: preference_id}} />
      </div>
    );
};