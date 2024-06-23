import { ButtonAddProducto } from "@/app/ui/button"
import Image from "next/image"
import { Producto } from "../lib/definitions"
import { fetchRating } from "../lib/dataProductos";

interface InfoProductoTitle {
    data: Producto
}


export default async function InfoProducto({ data }: InfoProductoTitle){
         const rating = await fetchRating(data?.title);
       
        return (
            <>
                <div className="grid gap-4 md:gap-10 items-start">
                    <Image
                        alt={data?.title}
                        className="aspect-[2/3] object-cover border w-full rounded-lg overflow-hidden border-gray-800"
                        height={900}
                        src={data?.poster}
                        width={600}
                    />
                </div>
                <div className="grid gap-4 md:gap-10 items-start text-white">
                    <div className="grid gap-4">
                        <h1 className="font-bold text-3xl lg:text-4xl">{data?.title}</h1>
                        <div>
                            <p>
                                {data?.plot}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-4xl font-bold">${data.disable? " - " : data.price}</div>
                        </div>
                    </div>
                        {data.disable? <h1 className="font-bold text-3xl lg:text-4xl">No disponible</h1> : <ButtonAddProducto id={data?.id}/>}
                    <div className="grid gap-4 text-sm leading-loose">
                        <h2 className="font-bold text-lg">Details</h2>
                        <ul className="grid gap-2">
                            <li>
                                <span className="font-medium">Genere: </span>
                                {data?.genere}{"\n                    "}
                            </li>
                            <li>
                                <span className="font-medium">Duration: </span>
                                {data?.runtime}{"\n                    "}
                            </li>
                            <li>
                                <span className="font-medium">Director: </span>
                                {
                                    data?.type === "pelicula" ? data?.director : data?.writer
                                }{"\n                    "}
                            </li>
                            <li>
                                <span className="font-medium">Actors: </span>
                                {data?.actors}{"\n                    "}
                            </li>
                            <li>
                            {rating?.length > 0 && <span className="font-medium">Ratings: </span> }
                            <ul>
                                {
                                rating?.map((rating) => (
                                    <li className="px-2 " key={rating.Source}>
                                        <span className="font-medium">{rating.Source}: </span>
                                        {rating.Value}{"\n                    "}
                                    </li>
                                ))
                                }
                            </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        )
    }   
