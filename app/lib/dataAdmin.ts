'use server'

import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import {Producto} from "./definitions"

export async function getAllTypeProductos(type :string) {
    try {
      const price = await sql`SELECT *
      FROM productos
      WHERE type = ${type}
    `;
    return price.rows[0].price;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch all '+{type}+' data.');
    }
  }

  export async function fetchProducto(id: string) {
    noStore();
   
    try {
       console.log('Fetching revenue data...'+id);
  
      const data = await sql<Producto>`SELECT * FROM productos WHERE id = ${id}`;

      return data.rows[0];
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch un pelicula data.');
    }
  }
  
export async function updateMovie(movieData: Producto) {
    noStore();
    console.log(movieData);
    try {
      const update = await sql<Producto>`
      UPDATE productos
      SET year = ${movieData.year}, poster = ${movieData.poster}, runtime = ${movieData.runtime},
          genere = ${movieData.genere}, director = ${movieData.director}, actors = ${movieData.actors},
          price = ${movieData.price} , disable = ${movieData.disable}
      WHERE id = ${movieData.id};
    `;
    console.log("Movie updated: " + movieData.title);
    return update;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed update the movie.');
    }
  }

  export async function updateSerie(serieData: Producto) {
    noStore();
    console.log(serieData);
    try {
      const update = await sql<Producto>`
      UPDATE productos
      SET year = ${serieData.year}, poster = ${serieData.poster}, runtime = ${serieData.runtime},
          genere = ${serieData.genere}, writer = ${serieData.director}, actors = ${serieData.actors},
          totalseasons = ${serieData.totalseasons}, price = ${serieData.price}, disable = ${serieData.disable}
      WHERE id = ${serieData.id};
    `;
    console.log("Movie updated: " + serieData.title);
    return update;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed update the serie.');
    }
  }


export async function updateEnabledProduct(id: string, disable: boolean) {
    noStore();
    console.log(id+" - "+disable);
    try {
      const update = await sql<Producto>`
      UPDATE productos
      SET disable = ${disable}
      WHERE id = ${id};
    `;
    console.log("Product updated: " + id);
    return update;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to update the product.');
    }   
}

export async function isDisabled(id: string) {
    noStore();
    try {
      const disable = await sql<Producto>`
      SELECT disable
      FROM productos
      WHERE id = ${id};
    `;
    console.log("Product updated: " + id);
    return disable.rows[0].disable;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to update the product.');
    }   
}


export async function totalPages(type: string) {
    noStore();
    try {
      const total = await sql`SELECT count(*) FROM productos WHERE type = ${type}`;
      return total.rows[0].count;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch total pages.');
    }
  }

  export async function deleteToStorage(id: string) {
    noStore();
    console.log(id);
    try {
      const dalete = await sql<Producto>`
            DELETE FROM productos
            WHERE id = ${id};
          `;
    console.log("Product deleted: " + id);
    return dalete;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to delete the product.');
    }
  }