'use client';
import Swal from 'sweetalert2';
import { useState, useRef } from 'react';
import { Producto } from "@/app/lib/definitions";
import { updateMovie } from "@/app/lib/dataAdmin"; 
import { updateSerie } from "@/app/lib/dataAdmin";
import { useRouter } from 'next/navigation';
import { ButtonDelete } from '../button';

interface ProductFormProps {
  movieData: Producto;
}

export default function ProductForm({ movieData }: ProductFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    const data = Object.fromEntries(formData.entries());
    const finalData:Producto = {
      ...movieData,
      ...data,
      year: Number(data.year),
      price: Number(data.price),
      disable: data.disable === 'true',
      totalseasons: data.totalseasons ? Number(data.totalseasons) : 0,
    };

    try {
      finalData.type === "pelicula" ? await updateMovie(finalData) : await updateSerie(finalData);
      await Swal.fire("exito").then(router.refresh);
    } catch (error) {
      console.error('Database Error:', error);
      Swal.fire("Database Error: Failed to Update product.", "", "error");
    }
  };

  return (
    <div className="text-white bg-gray-950 shadow-sm rounded-lg p-6 w-full">
      <div>
        <div className='flex items-center justify-between pb-4'>
          <h2 className="text-xl font-bold">{movieData.type}</h2>
          <ButtonDelete id={movieData.id} type={movieData.type}/>
        </div>
        <form ref={formRef} onSubmit={handleSubmit} className="bg-[#0F1A2F] rounded-lg p-6 space-y-4">
          <div>
            <label className="block font-medium mb-1" htmlFor="title">
              Title
            </label>
            <input
              className="bg-[#0B1120] border border-gray-200 rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:ring-[#4F46E5] dark:border-gray-800"
              id="title"
              name="title"
              type="text"
              defaultValue={movieData.title}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="block font-medium mb-1" htmlFor="year">
                Year
              </label>
              <input
                className="bg-[#0B1120] border border-gray-200 rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:ring-[#4F46E5] dark:border-gray-800"
                id="year"
                name="year"
                type="number"
                defaultValue={movieData.year}
              />
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1" htmlFor="poster">
              Poster
            </label>
            <input
              className="bg-[#0B1120] border border-gray-200 rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:ring-[#4F46E5] dark:border-gray-800"
              id="poster"
              name="poster"
              type="text"
              defaultValue={movieData.poster}
            />
          </div>
          <div>
            <label className="block font-medium mb-1" htmlFor="plot">
              Plot
            </label>
            <textarea
              className="bg-[#0B1120] border border-gray-200 rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:ring-[#4F46E5] resize-none dark:border-gray-800"
              id="plot"
              name="plot"
              defaultValue={movieData.plot}
            />
          </div>
          <div>
            <label className="block font-medium mb-1" htmlFor="runtime">
              Runtime
            </label>
            <input
              className="bg-[#0B1120] border border-gray-200 rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:ring-[#4F46E5] dark:border-gray-800"
              id="runtime"
              name="runtime"
              type="text"
              defaultValue={movieData.runtime}
            />
          </div>
          {movieData.type === "serie" ? (
              <div>
                <label className="block font-medium mb-1" htmlFor="totalseasons">
                  Seasons
                </label>
                <input
                  className="bg-[#0B1120] border border-gray-200 rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:ring-[#4F46E5] dark:border-gray-800"
                  id="totalseasons"
                  name="totalseasons"
                  type="number"
                  defaultValue={movieData.totalseasons}
                />
              </div>
            ) : null          
          }
          <div>
            <label className="block font-medium mb-1" htmlFor="genere">
              Genere
            </label>
            <input
              className="bg-[#0B1120] border border-gray-200 rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:ring-[#4F46E5] dark:border-gray-800"
              id="genere"
              name="genere"
              type="text"
              defaultValue={movieData.genere}
            />
          </div>
          {movieData.type === "pelicula" ? (
                <div>
                <label className="block font-medium mb-1" htmlFor="director">
                  Director
                </label>
                <input
                  className="bg-[#0B1120] border border-gray-200 rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:ring-[#4F46E5] dark:border-gray-800"
                  id="director"
                  name="director"
                  type="text"
                  defaultValue={movieData.director}
                />
              </div>
            ) :
                <div>
                <label className="block font-medium mb-1" htmlFor="writer">
                  Writer 
                </label>
                <input
                  className="bg-[#0B1120] border border-gray-200 rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:ring-[#4F46E5] dark:border-gray-800"
                  id="writer"
                  name="writer"
                  type="text"
                  defaultValue={movieData.writer}
                />
              </div>  
          }
          <div>
            <label className="block font-medium mb-1" htmlFor="actors">
              Actors
            </label>
            <input
              className="bg-[#0B1120] border border-gray-200 rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:ring-[#4F46E5] dark:border-gray-800"
              id="actors"
              name="actors"
              type="text"
              defaultValue={movieData.actors}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="block font-medium mb-1" htmlFor="price">
                Price
              </label>
              <input
                className="bg-[#0B1120] border border-gray-200 rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:ring-[#4F46E5] dark:border-gray-800"
                id="price"
                name="price"
                type="number"
                defaultValue={movieData.price}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div> 
              <label className="block font-medium mb-1" htmlFor="disable">
                Disable
              </label>
              <select
                className="bg-[#0B1120] border border-gray-200 rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:ring-[#4F46E5] dark:border-gray-800"
                id="disable"
                name="disable"
                defaultValue={movieData.disable.toString()}
              >
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit Info
          </button>
        </form>
      </div>
    </div>
  );
}
