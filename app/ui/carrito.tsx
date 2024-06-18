import Link from "next/link"
import {listaEnCarrito, getTotalPrice} from "../lib/data"
import { deleteToCart } from "../lib/actions"
import { Producto } from "../lib/definitions";
import { fetchUnProducto } from "../lib/dataProductos";
import { Button } from "./button";
import Image from "next/image";

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

initMercadoPago('APP_USR-7f442d04-e853-40da-b794-5febfed8cf87', { locale: 'es-AR' });

const productoLista : Producto[] = [];
//const preferenceID: String = "";

async function CartItem({producto}:{producto: Producto}) {
    const deleteFilmsToCart = deleteToCart.bind(null, producto.id);
    if(producto===undefined){return <></>}
    return(
        <div className="grid grid-cols-[80px_1fr_80px] items-center gap-4">
          <Link href={`/${producto.id}/infoProducto`}>
          <Image
            alt={producto.title}
            className="rounded-md"
            height={80}
            src={producto.poster}
            style={{
              aspectRatio: "80/80",
              objectFit: "cover",
            }}
            width={80}
          />
          </Link>
          <div>
            <Link className="font-medium hover:underline" href={`/${producto.id}/infoProducto`}>{producto.title}</Link>
            <p className="text-gray-400 text-sm">{producto.year}</p>
          </div>
          <div className="text-right">
            <p className="font-medium">${producto.price}</p>
            <form action={deleteFilmsToCart}>
                <button className="text-red-500 hover:underline text-sm">Remove</button>    
            </form>
          </div>
        </div>
    )
}

export async function Carro() {
  const data = await listaEnCarrito();
  const totalPrice = await getTotalPrice();
  const suma = totalPrice ? await totalPrice.reduce(async (totalPromise, valorPromise) => {
    const total = await totalPromise;
    const valor = await valorPromise;
    return total + valor;
  }, Promise.resolve(0)) : 0;

  if(data === null || data == undefined) return (
      <div className="space-y-4">
        <div className="text-gray-500">No agregaste nada al carrito!!!</div>
      </div>
    )
    else
  return (
    <>
      <div className="space-y-4 ">
        {
        data?.map(async (id) => {
          let dataFilm = null;
          //modificar!!!!!!!!!!!!
          try {
             dataFilm = await fetchUnProducto(id);
             productoLista.push(dataFilm);
             return <CartItem key={dataFilm?.title} producto={dataFilm} />
          } catch (error) {
              error;
          }
        })}
      </div>
      <div className="border-t border-gray-800 mt-6 pt-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-500 dark:text-gray-400">Subtotal</p>
          <p className="font-medium">${suma}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-gray-500 dark:text-gray-400">Shipping</p>
          <p className="font-medium">$5.00</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-gray-500 dark:text-gray-400">Total</p>
          <p className="font-medium text-2xl">${suma + 5}</p>
        </div>
      </div>
      <div className="flex justify-end mt-6 gap-2">
       <Wallet initialization={{ preferenceId: fetchPreference }} />
      </div>

    </>
  )
}

const fetchPreference = async () => {
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
    return data.id;
  } catch (error) {
    console.log(error);
  }
};

export default async function Carrito() {
  return (
    <div className="text-white bg-gray-950 shadow-sm rounded-lg max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Your Cart</h2>
        <Link className="text-primary hover:underline" href="/">
          Continue Shopping
        </Link>
      </div>
      <Carro/>
    </div>
  )
}
