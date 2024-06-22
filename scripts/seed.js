const { db } = require('@vercel/postgres');

const bcrypt = require('bcrypt');

const {
    peliculas,
    series,
    users,
    transactions,
} = require('../app/lib/placeholder-data.js');
  
  async function crearTablaProducto(client) {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    try {
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS productos (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,   
          type VARCHAR(255) NOT NULL,
          title VARCHAR(255) NOT NULL,
          year VARCHAR(255) NOT NULL,
          poster VARCHAR(255) NOT NULL,
          plot VARCHAR(255) NOT NULL,
          runtime VARCHAR(255) NOT NULL,
          genere VARCHAR(255) NOT NULL,
          director VARCHAR(255),
          writer VARCHAR(255),
          actors VARCHAR(255) NOT NULL,
          totalSeasons SMALLINT,
          price SMALLINT NOT NULL,
          disable BOOLEAN NOT NULL DEFAULT FALSE
        );`;
        console.log(`Created "productos" table`);

        return{
            createTable
        };

    } catch (error) {
        console.error('Database Error:', error);
    }   

  }

  async function seedProductos(client) {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    try {
        const insertedPeliculas = await Promise.all(
            peliculas.map(async (pelicula) => {
                console.log(`Inserting ${pelicula}`);
                const datosPelicula = await fetchPelicula(pelicula);
                console.log(`Inserting 2 ${datosPelicula.title}`);
                return client.sql`
                    INSERT INTO productos (type, title, year, poster, plot, runtime, genere, director, actors, price)
                    VALUES ('pelicula',${datosPelicula.title}, ${datosPelicula.year}, ${datosPelicula.poster}, ${datosPelicula.plot}, ${datosPelicula.runtime}, ${datosPelicula.genere}, ${datosPelicula.director}, ${datosPelicula.actors}, ${datosPelicula.price})
                    ON CONFLICT (id) DO NOTHING;
                `;
            }),
        );
        
        const insertedSeries = await Promise.all(
            series.map(async (serie) => {
                const datosSerie = await fetchSerie(serie);
                console.log(`Inserting serie ${datosSerie.title}`);
                return client.sql`
                    INSERT INTO productos (type, title, year, poster, plot, runtime, genere, writer, actors, totalSeasons, price)
                    VALUES ('serie',${datosSerie.title}, ${datosSerie.year}, ${datosSerie.poster}, ${datosSerie.plot}, ${datosSerie.runtime}, ${datosSerie.genere}, ${datosSerie.writer}, ${datosSerie.actors}, ${datosSerie.totalSeasons}, ${datosSerie.price})
                    ON CONFLICT (id) DO NOTHING;
                `;
            }),
        );

        return{
            insertedPeliculas,
            insertedSeries
        };
    }
    catch (error) {
        console.error('Error:', error);
}
}

async function fetchPelicula(titulo){
    var key="6d7434b2";
    var url="http://www.omdbapi.com/?apikey="+key+"&t="+titulo;
    try {
        console.log('Fetching revenue data...');
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch pelicula.');
        }
        var numeroAleatorio = Math.floor(Math.random() * 30) + 1;
        const data = await response.json();
        return {
            title: data.Title,
            year: data.Year,
            poster: data.Poster,
            plot: data.Plot,
            runtime: data.Runtime,
            genere: data.Genre,
            director: data.Director,
            actors: data.Actors,
            price: numeroAleatorio
        };
    } catch (error) {
        throw new Error('Failed to fetch pelicula.');
    }
}

async function fetchSerie(titulo){
    var key="6d7434b2";
    var url="http://www.omdbapi.com/?apikey="+key+"&t="+titulo;
    try {
        console.log('Fetching serie data...');
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch serie.');
        }
        var numeroAleatorio = Math.floor(Math.random() * 30) + 1;
        const data = await response.json();
        return {
            title: data.Title,
            year: data.Year,
            poster: data.Poster,
            plot: data.Plot,
            runtime: data.Runtime,
            genere: data.Genre,
            writer: data.Writer,
            actors: data.Actors,
            totalSeasons: data.totalSeasons,
            price: numeroAleatorio
        };
    } catch (error) {
        throw new Error('Failed to fetch serie.');
    }
}

async function seedUsers(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS users (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
        );
      `;
  
      console.log(`Created "users" table`);
  
      // Insert data into the "users" table
      const insertedUsers = await Promise.all(
        users.map(async (user) => {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          return client.sql`
          INSERT INTO users (email, password)
          VALUES (${user.email}, ${hashedPassword})
          ON CONFLICT (id) DO NOTHING;
        `;
        }),
      );
  
      console.log(`Seeded ${insertedUsers.length} users`);
  
      return {
        createTable,
        users: insertedUsers,
      };
    } catch (error) {
      console.error('Error seeding users:', error);
      throw error;
    }
  }

  async function crearTablaTransacciones(client) {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    try {
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS transactions (
          id INT PRIMARY KEY,   
          status VARCHAR(255) NOT NULL,
          payer_id VARCHAR(255) NOT NULL,
          payer_email VARCHAR(255) NOT NULL,
          amount INT NOT NULL
        );`;
        console.log(`Created "transactions" table`);

        return{
            createTable
        };

    } catch (error) {
        console.error('Database Error:', error);
    }   

  }

  //agregamos una transaccion de ejemplo a la tabla
  async function seedTransactions(client){

    return client.sql`
        INSERT INTO transactions (id, status, payer_id, payer_email, amount)
        VALUES (1, 'approved', 12, first@email.com, 20);
       `;
  }

async function main() {
    const client = await db.connect();
    
    await crearTablaProducto(client);
    await seedProductos(client);
    await seedUsers(client);
    await crearTablaTransacciones(client);
    await seedTransactions(client);
    await client.end();
  }
  
  main().catch((err) => {
    console.error(
      'An error occurred while attempting to seed the database:',
      err,
    );
  });