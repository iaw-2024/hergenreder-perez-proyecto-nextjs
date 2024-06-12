'use client';
import Swal from 'sweetalert2';

import { useState } from 'react';
import { Producto } from "@/app/lib/definitions";
import { addProduct } from "@/app/lib/dataAdmin";
import { useRouter } from 'next/navigation';

export default function AddMovieForm() {
    const movieData: Producto = {
        id: "",
        type: "pelicula",
        title: "",
        plot: "",
        year: 0,
        poster: "",
        runtime: "",
        genere: "",
        director: "",
        writer: "",
        actors: "",
        totalseasons: 0,
        price: 0,
        disable: false
    }

    const [formData, setFormData] = useState(movieData);

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
            await addProduct(formData);
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
                            required
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
                                required
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
                            required
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
                            required
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
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1" htmlFor="genere">
                            Genere
                        </label>
                        <input
                            className="bg-[#0B1120] border border-gray-200 rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:ring-[#4F46E5] dark:border-gray-800"
                            id="genere"
                            type="text"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1" htmlFor="director">
                            Director
                        </label>
                        <input
                            className="bg-[#0B1120] border border-gray-200 rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:ring-[#4F46E5] dark:border-gray-800"
                            id="director"
                            type="text"
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1" htmlFor="actors">
                            Actors
                        </label>
                        <input
                            className="bg-[#0B1120] border border-gray-200 rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:ring-[#4F46E5] dark:border-gray-800"
                            id="actors"
                            type="text"
                            required
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
                                required
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
                                required
                                onChange={handleChange}
                            >
                                <option value="false">false</option>
                                <option value="true">true</option>
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




