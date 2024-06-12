import Link from "next/link"
import {fetchFilteredFilms } from "@/app/lib/dataFilms"
import { fetchFilteredSeries } from "@/app/lib/dataSeries"
import {fetchFilteredProductos} from "@/app/lib/dataProductos"
import { Producto } from "@/app/lib/definitions"
import Image from "next/image"

interface ProductItemProps {
    producto: Producto
  }

async function ProductEdit({producto}: ProductItemProps){
    
        return (
            /*agregar mapeo para todos los productos, o una cantidad. */
            <Link className="block transition ease-in-out hover:-translate-y-1 hover:scale-110" href={`./${producto?.id}/infoEditProducto`}>
            <div className="grid grid-cols-[80px_1fr_80px] items-center gap-4 bg-gray-950  rounded-md">
                        <Image
                            alt={producto.title}
                            className="rounded-md"
                            height="80"
                            src={producto.poster}
                            style={{
                                aspectRatio: "80/80",
                                objectFit: "cover",
                              }}
                        width="80"
                        />
                    
                <div className="max-h-30 sm:block">
                    <h3 className="text-white font-semibold text-lg">{producto.title}</h3>
                    <h1 className="text-gray-300 dark:text-gray-400">{producto.genere} - {producto.year}</h1>
                </div>
            </div>
            </Link>
        )
}


export default async function ProductoCardEdit({
    type,
    query,
    currentPage,
  }: {
    type: string;
    query: string;
    currentPage: number;
  }) 
 {
    let data;

    switch(type){
        case "series":
            data = await fetchFilteredSeries(query, currentPage);
            break;
        case "movies":
            data = await fetchFilteredFilms(query, currentPage);
            break;
        default:
            data = await fetchFilteredProductos(query, currentPage);
    }
    if(data.length === 0) return <div className="text-gray-300 w-full justify-center flex text-lg">No se encontraron resultados</div>
    else{
    return (
        <div className="grid grid-cols-1 max-w-6xl mx-auto gap-4">
            {
            data.map(async (Producto) => (
                <ProductEdit key={Producto.title} producto={Producto}/>
            )) 
            }
        </div>
    )} 
}