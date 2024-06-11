import { useRouter } from 'next/router';
import clsx from 'clsx';
import { deleteToCart, addToCart, estaPeliculaEnCarrito } from "@/app/lib/actions";
import {deleteToStorage} from "@/app/lib/dataAdmin";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        className,
      )}
    >
      {children}
    </button>
  );
}

export async function ButtonAddProducto({id}:{id:string}){
  const addFilmsToCart = addToCart.bind(null, id);
  const deleteFilmsToCart = deleteToCart.bind(null, id);
  if(await estaPeliculaEnCarrito(id)){
    return (
      <form action={deleteFilmsToCart}>
        <button className="flex h-10 items-center rounded-lg bg-red-500 px-4 text-sm font-medium text-white transition-colors hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
           delete cart
        </button>
      </form>
    )
  }else{
    return (
      <form action={addFilmsToCart}>
      <button className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
        add cart
      </button>
    </form>
    )
  }
}

async function confirmDelete(id: string, type: string){
  var resultado = window.confirm('Estas seguro de eliminar el producto?');
  if (resultado) {
    try {
      await deleteToStorage(id);
      window.alert('Producto eliminado con éxito');
      window.location.assign('/admin');
    } catch (error) {
      return {
        mensage: 'Database Error: Failed to Delete product.',
    };
    }
  }
}

export async function ButtonDelete({id, type} : {id : string, type: string}){
  const deleteProduct = confirmDelete.bind(null, id, type);
  return (
    <form action={deleteProduct}>
      <button className="flex h-10 items-center rounded-lg bg-red-500 px-4 text-sm font-medium text-white transition-colors hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
        delete
      </button>
    </form>
  )
}