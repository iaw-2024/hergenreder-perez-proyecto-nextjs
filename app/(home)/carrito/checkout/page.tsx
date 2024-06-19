"use client"

import React from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

export default function Payment(preference_id: string){
    initMercadoPago('APP_USR-7f442d04-e853-40da-b794-5febfed8cf87', { locale: 'es-AR' });

    return (
      <div>
        <Wallet initialization={{preferenceId: preference_id}} />
      </div>
    );
};