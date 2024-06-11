'use client';

import { useState } from 'react';
import { Producto } from "@/app/lib/definitions";
import { updateMovie } from "@/app/lib/dataAdmin"; 
import { updateSerie } from "@/app/lib/dataAdmin";
import { useRouter } from 'next/navigation';
import {ButtonDelete} from '../button';

interface ProductFormProps {
  movieData: Producto;
}

export default function ProductForm({ movieData }: ProductFormProps) {
  const [formData, setFormData] = useState({ ...movieData });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    //e.preventDefault();
    try {
      formData?.type === "pelicula" ? await updateMovie(formData): await updateSerie(formData);
      
      alert('Movie updated successfully');
      router.push('/admin/movies');
    } catch (error) {
      console.error('Failed to update movie', error);
    }
  };

  return (
    <div className="text-white bg-gray-950 shadow-sm rounded-lg p-6 w-full">
      <div>
        <div className='flex items-center justify-between pb-4'>
          <h2 className="text-xl font-bold">{movieData.type}</h2>
          <ButtonDelete id={movieData.id} type={movieData.type}/>
        </div>
        <form onSubmit={handleSubmit} className="bg-[#0F1A2F] rounded-lg p-6 space-y-4">
          <div>
            <label className="block font-medium mb-1" htmlFor="title">
              Title
            </label>
            <input
              className="bg-[#0B1120] border border-gray-200 rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:ring-[#4F46E5] dark:border-gray-800"
              id="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
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
                type="number"
                value={formData.year}
                onChange={handleChange}
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
              type="text"
              value={formData.poster}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-medium mb-1" htmlFor="plot">
              Plot
            </label>
            <textarea
              className="bg-[#0B1120] border border-gray-200 rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:ring-[#4F46E5] resize-none dark:border-gray-800"
              id="plot"
              value={formData.plot}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-medium mb-1" htmlFor="runtime">
              Runtime
            </label>
            <input
              className="bg-[#0B1120] border border-gray-200 rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:ring-[#4F46E5] dark:border-gray-800"
              id="runtime"
              type="text"
              value={formData.runtime}
              onChange={handleChange}
            />
          </div>
          {formData.type === "serie" ? (
              <div>
                <label className="block font-medium mb-1" htmlFor="totalseasons">
                  Seasons
                </label>
                <input
                  className="bg-[#0B1120] border border-gray-200 rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:ring-[#4F46E5] dark:border-gray-800"
                  id="totalseasons"
                  type="number"
                  value={formData.totalseasons}
                  onChange={handleChange}
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
              type="text"
              value={formData.genere}
              onChange={handleChange}
            />
          </div>
          {formData?.type === "pelicula" ? (
                <div>
                <label className="block font-medium mb-1" htmlFor="director">
                  Director
                </label>
                <input
                  className="bg-[#0B1120] border border-gray-200 rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:ring-[#4F46E5] dark:border-gray-800"
                  id="director"
                  type="text"
                  value={formData.director}
                  onChange={handleChange}
                />
              </div>
            ) :
                <div>
                <label className="block font-medium mb-1" htmlFor="director">
                  Writer 
                </label>
                <input
                  className="bg-[#0B1120] border border-gray-200 rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:ring-[#4F46E5] dark:border-gray-800"
                  id="writer"
                  type="text"
                  value={formData.writer}
                  onChange={handleChange}
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
              type="text"
              value={formData.actors}
              onChange={handleChange}
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
                type="number"
                value={formData.price}
                onChange={handleChange}
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
                defaultValue={formData.disable.valueOf().toString()}
                onChange={handleChange}
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




