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
  
export async function updateMovie(productoData: Producto) {
    noStore();
    console.log(productoData);
    try {
      const update = await sql<Producto>`
      UPDATE productos
      SET year = ${productoData.year}, poster = ${productoData.poster}, runtime = ${productoData.runtime},
          genere = ${productoData.genere}, director = ${productoData.director}, actors = ${productoData.actors},
          price = ${productoData.price} , disable = ${productoData.disable}
      WHERE id = ${productoData.id};
    `;
    console.log("Movie updated: " + productoData.title);
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

export async function addProduct(productoData: Producto) {
    noStore();
    console.log(productoData);
    try {
      const insert = await sql<Producto>`
      INSERT INTO productos
      (title, year, poster, plot, runtime, genere, director, writer, actors, totalseasons, disable, price, type)
      VALUES
      (${productoData.title}, ${productoData.year}, ${productoData.poster}, ${productoData.plot}, ${productoData.runtime}, ${productoData.genere}, ${productoData.director}, ${productoData.writer}, ${productoData.actors}, ${productoData.totalseasons}, ${productoData.disable}, ${productoData.price}, ${productoData.type});
    `;
    console.log("Producto added: " + productoData.title);
    return insert;
    } catch (error) {
      console.error('Database Error:', error);
      return error;
    }
}


const ITEMS_PER_PAGE = 12;
export async function fetchFilteredTypeProductos(
    type: string,
    query: string,
    currentPage: number,
) {
    noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    try {
        const peliculas = await sql<Producto>`
      SELECT
        *
      FROM productos
      WHERE
          type ILIKE ${`%${type}%`} AND (
          title ILIKE ${`%${query}%`} OR
          year ILIKE ${`%${query}%`} OR
          actors ILIKE ${`%${query}%`} OR
          director ILIKE ${`%${query}%`} OR
          genere ILIKE ${`%${query}%`}
        )
      ORDER BY year DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

        return peliculas.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch peliculas for page.');
    }
}

export async function fetchProductsPages(type: string, query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM productos
    WHERE
        type ILIKE ${`%${type}%`} AND (
        title ILIKE ${`%${query}%`} OR
        year ILIKE ${`%${query}%`} OR
        actors ILIKE ${`%${query}%`} OR
        director ILIKE ${`%${query}%`}
      )
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}


export async function totalSeries() {
    noStore();
    try {
      const total = await sql`SELECT count(*) FROM productos WHERE type = 'serie'`;
      return total.rows[0].count;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch total pages.');
    }
}
export async function totalMovies() {
    noStore();
    try {
      const total = await sql`SELECT count(*) FROM productos WHERE type = 'pelicula'`;
      return total.rows[0].count;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch total pages.');
    }
}

export async function getLastTransactions() {
    noStore();
    try {
      const total = await sql`SELECT * FROM transactions ORDER BY date DESC LIMIT 5;`;
      return total.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch total pages.');
    }
}

const TRANSACTIONS_PER_PAGE = 5;
export async function getTransactions( currentPage: number) {
  noStore();
    const offset = (currentPage - 1) * TRANSACTIONS_PER_PAGE;
  noStore();
  try {
    const total = await sql`
      SELECT * FROM transactions 
      ORDER BY date DESC
      LIMIT ${TRANSACTIONS_PER_PAGE} OFFSET ${offset}`;
    return total.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total pages.');
  }
}

export async function getTransactionsForPage() {
  noStore();
  try {
    const total = await sql`SELECT count(*) FROM transactions;`;
    const totalPages = Math.ceil(Number(total.rows[0].count) / TRANSACTIONS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total pages.');
  }
}

export async function getTotalTransactions() {
  noStore();
  try {
    const total = await sql`SELECT count(*) FROM transactions;`;
    return total.rows[0].count;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total pages.');
  }
}

export async function getItemsForTransactions(id: string) {
  noStore();
  try {
    const total = await sql`SELECT * FROM items_transactions WHERE id_compra = ${id};`;
    return total.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total pages.');
  }
}

