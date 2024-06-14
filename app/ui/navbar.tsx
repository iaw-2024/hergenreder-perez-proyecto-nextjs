'use client';
import Link from "next/link";
import Search from '@/app/ui/search';
import {ShoppingCartIcon, UserIcon, MenuIcon} from "@/app/ui/icono"
import {Button} from "./button"
import {Suspense, useState } from "react";

export default function Component() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 flex h-16 w-full items-center justify-between px-4 md:px-12 bg-gray-950 text-white gap-8">
      <div className="flex items-center gap-4 ">
        <Link className="hover:text-[#4b6bfb] transition-colors" href="/">
          <span className="font-semibold text-xl">Store</span>
        </Link>
        <div className="hidden md:flex gap-4">
          <Link className="hover:text-[#4b6bfb] transition-colors" href="/movies">
            <span>Movies</span>
          </Link>
         <Link className="hover:text-[#4b6bfb] transition-colors" href="/series">
            <span>Series</span>
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-end gap-4 md:gap-6">
        <div className="flex-1 max-w-md gap-4 flex items-center justify-center">
          <Suspense>
            <Search placeholder="Search..." />
          </Suspense>
        </div>
        <Link className="hover:text-[#4b6bfb] transition-colors" href="/carrito">
        <ShoppingCartIcon/>
          <span className="sr-only">Cart</span>
        </Link>
      </div>
      <div className="md:hidden">
        <Button onClick={toggleMenu}>
          <MenuIcon />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
        {isOpen && (
          <nav className="absolute top-16 right-3 rounded shadow border border-gray-400 bg-gray-800">
            <div className="grid gap-4 grid-cols-1 p-4 min-w-40">
              <Link className="hover:text-[#4b6bfb] transition-colors" href="/movies">
                  <span>Films</span>
                </Link>
                <Link className="hover:text-[#4b6bfb] transition-colors" href="/series">
                  <span>Series</span>
                </Link>
            </div>
        </nav>
      )}
      </div>
    </header>
  )
}