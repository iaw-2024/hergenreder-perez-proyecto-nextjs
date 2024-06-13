import type { NextApiRequest, NextApiResponse } from 'next'
import { Producto } from '@/app/lib/definitions';
import { fetchPeliculas } from '@/app/lib/dataFilms';
 
type ResponseData = {
  producto: Producto[]
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const peliculas = await fetchPeliculas();
  res.status(200).json({ producto: peliculas })
}