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
      id: number,
      date_created: string,
      date_approved: string,
      date_last_updated: string,
      money_release_date: string,
      payment_method_id: string,
      payment_type_id: string,
      status: string,
      status_detail: string,
      currency_id: string,
      description: string,
      collector_id: number,
      payer: {
        id: number,
        email: string,
        identification: {
          type: string,
          number: number
        }
      }
    }