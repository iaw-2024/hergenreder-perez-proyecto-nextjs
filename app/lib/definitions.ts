export type Producto = {
    id: string;
    type : "serie" | "pelicula";
    title: string;
    year: number;
    poster: string;
    plot: string;
    runtime: string;
    genere: string;
    director: string;
    writer: string;
    actors: string;
    totalseasons: number;
    price: number;
    disable: boolean;
  };

  export type User = {
    email: string;
    password: string;
  };

  export type Payment = {
      id: number;
      status: string;
      payer: {
        id: string;
        email: string;
      }
      transaction_amount: number;
      items:{
        id: string,
        title: string,
        unit_price: number
      }[]
  };