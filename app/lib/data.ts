'use server'
import { cookies } from 'next/headers'
import { sql } from '@vercel/postgres';
import { fetchUnProducto } from './dataProductos';


export async function obtenerProductos(listaProducto:RegExpMatchArray){
  try{
    const productosPromises = await Promise.all(listaProducto.map(async id =>{
      const product = await fetchUnProducto(id);
      if(product?.disable === false) return product;
      else return null;
    } ));
    const productos = productosPromises.filter(product => product !== null);
    return productos;
  }catch(error){
    console.log(error);
    return null;
  }
}

export async function listaEnCarrito() {
    const regex = /(?<=\/)([^/]+)/g;
    const lista = cookies().get("cliente")?.value;
    return lista?.match(regex);
  }
  
  async function getPrice(id:string){
    try {
      const price = await sql`SELECT price
      FROM productos
      WHERE
        id = ${id} AND disable = false;
    `;
    return price.rows[0].price;
    } catch (error) {
      console.error('Database Error:', error);
      //throw new Error('Failed to fetch total number of invoices.');
      return 0;
    }
  }
  
  export async function getTotalPrice(){
    const lista = await listaEnCarrito();
    return lista?.map(async (producto) => {
      return Number(await getPrice(producto));
    })
  }  