'use server'

import { sql } from '@vercel/postgres';
import { Producto } from "./definitions"
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchProductos(type: string) {
    noStore();
    try {
        console.log('Fetching revenue data...');

        const data = await sql<Producto>`SELECT * FROM productos WHERE disable = false AND type = ${type}`;

        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch ' + { type } + ' data.');
    }
}

export async function fetchAllProductos() {
    noStore();
    try {
        console.log('Fetching revenue data...');

        const data = await sql<Producto>`SELECT * FROM productos WHERE disable = false`;

        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch productos data.');
    }
}

export async function fetchUnProducto(id: string) {
    noStore();

    try {
        console.log('Fetching revenue data...' + id);

        const data = await sql<Producto>`SELECT * FROM productos WHERE id = ${id} AND disable = false`;

        return data.rows[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch un pelicula data.');
    }
}

export async function fetchProductosForGrid() {
    noStore();
    try {
        const data = await sql<Producto>`SELECT *
            FROM productos
            WHERE disable = false
            ORDER BY year DESC
            LIMIT 3;`
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch grid Productos data.');
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
    console.log(query);
    try {
        const peliculas = await sql<Producto>`
      SELECT
        *
      FROM productos
      WHERE
        disable = false AND type ILIKE ${`%${type}%`} AND (
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

export async function fetchProductosTotalPages(query: string, type: string) {
    noStore();
    try {
        const count = await sql`SELECT COUNT(*)
    FROM productos
    WHERE
      disable = false AND type ILIKE ${`%${type}%`} AND (
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
        throw new Error('Failed to fetch total number of ' + { type } + '.');
    }
}

export async function totalProductos(type: string) {
    noStore();
    try {
        const count = await sql`SELECT COUNT(*)
    FROM productos 
    WHERE disable = false AND type = ${type}
    `;
        return count.rows[0].count;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of ' + { type } + '.');
    }
}

export async function fetchFilteredProductos(
    query: string,
    currentPage: number,
) {
    noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    console.log(query);
    try {
        const peliculas = await sql<Producto>`
      SELECT
        *
      FROM productos
      WHERE
        disable = false AND (
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
