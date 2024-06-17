import { fetchProducto} from "@/app/lib/dataAdmin";
import ProductForm from "@/app/ui/admin/product-form";
import { error } from "console";
import { Suspense } from "react";

interface InfoProductoPelicula {
  id: string
}

export default async function InfoProductoEdit({ id }: InfoProductoPelicula) {  
    console.log(id); 
    const data = await fetchProducto(id);
    if(!data){
        return (<div>No se encontro el producto</div>);
    }
    else{
        return (
            <div>
            <Suspense>
                <ProductForm movieData={data} />
            </Suspense>
            </div>
        );
    }
}
