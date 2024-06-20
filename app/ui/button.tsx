import Swal from 'sweetalert2';
import clsx from 'clsx';
import { deleteToCart, addToCart, estaPeliculaEnCarrito, deleteCart } from "@/app/lib/actions";
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

export async function ButtonDelete({id, type} : {id : string, type: string}){
  
  const handleClick = () => Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      color: "#FFFFFF",
      background: "#0F1A2F"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteToStorage(id);
          Swal.fire({title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
            color: "#FFFFFF",
            background: "#0F1A2F"
          }).then(()=>{window.location.assign('/admin')});
        }catch(error){
          Swal.fire({text:"Database Error: Failed to Delete product.",icon:"error", color: "#FFFFFF", background: "#0F1A2F"});
        }
      } 
    })
    return (
        <button onClick={handleClick} className="flex h-10 items-center rounded-lg bg-red-500 px-4 text-sm font-medium text-white transition-colors hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
          delete
        </button>
    )
}

export async function ButtonDeleteCart(){
  const handleSweetAlertClose = async () => {
    await deleteCart();
    Swal.fire({title: "Cart cleaned!",
      text: "Your cart has been cleaned.",
      icon: "success",
      color: "#FFFFFF",
      background: "#0F1A2F"
    });
  };

  return (
    <button onClick={handleSweetAlertClose} className="flex h-10 items-center rounded-lg bg-red-500 px-4 text-sm font-medium text-white transition-colors hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
      clean cart
    </button>
  )
}