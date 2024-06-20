'use server'
import { cookies } from 'next/headers'
import { signIn } from '@/auth';
import { AuthError } from 'next-auth'; 

export async function addToCart(id:string){
    const producto = "/"+id+"/";
    const cookieStore = cookies()
    try{
        if(cookieStore.get('cliente') === undefined){
            cookieStore.set({name: "cliente", value: producto});
        }
        else{
            const valor = cookieStore.get('cliente')?.value+""+producto;
            cookieStore.set({name: "cliente", value: valor});
        }
        
        console.log(id);
      return { message: 'producto agregada al carrito' };
    }catch(error){
      console.log(error);
    }
  }

  export async function deleteCart(){
    const cookieStore = cookies()
    try{
        if(cookieStore.get('cliente') === undefined){
            cookieStore.set({name: "cliente", value: ""});
        }
        else{
            cookieStore.set({name: "cliente", value: ""});
        }
      return { message: 'carrito limpio' };
    }catch(error){
      console.log(error);
    }
  }

  export async function deleteToCart(id:string){
    const producto = "/"+id+"/";
    const cookieStore = cookies();
    try{
      const nuevaCadena = cookieStore.get("cliente")?.value.replace(producto, "");
      if(nuevaCadena===undefined){
        cookieStore.set({name: "cliente", value: ""});
      }
      else{
        cookieStore.set({name: "cliente", value: nuevaCadena});
      } 
      console.log(id);
      return { message: 'producto agregada al carrito' };
    }catch(error){
      console.log(error);
    }
  }

  export async function estaPeliculaEnCarrito(pelicula: string) {
    const lista = cookies().get("cliente")?.value;
    return lista?.includes(pelicula);
  } 

  export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
}
