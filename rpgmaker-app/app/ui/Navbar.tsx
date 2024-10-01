"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isCitiesMenuOpen, setIsCitiesMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-indigo-600">
      <div className="container mx-auto flex justify-between items-center h-16 relative">
        <h1 className="text-white text-xl font-bold">
          <Link href="/dashboard">
            <span className="text-white hover:text-indigo-200 transition-colors duration-300">rpgmaker</span>
          </Link>
        </h1>

        <button
          className="text-white block lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        <ul className={`lg:flex lg:space-x-4 items-center absolute lg:relative lg:top-0 lg:left-0`}>
          <li
            className={`relative group h-16 flex items-center hover:bg-indigo-700`}
            onMouseEnter={() => setIsCitiesMenuOpen(true)}
            onMouseLeave={() => setIsCitiesMenuOpen(false)}
          >
            <Link href="/dashboard/cities" className={`block w-full h-full text-white flex items-center justify-center p-4 hover:text-indigo-200 transition-colors duration-300`}>
              Cidades
            </Link>
            {isCitiesMenuOpen && (
              <ul className="absolute left-0 top-full bg-white text-black rounded shadow-lg w-48 z-50">
                <li className="hover:bg-gray-200 p-2">
                  <Link href="/dashboard/cities/add-city" className="block w-full">Adicionar Cidade</Link>
                </li>
                <li className="hover:bg-gray-200 p-2">
                  <Link href="/dashboard/cities/view-cities" className="block w-full">Ver Cidades</Link>
                </li>
              </ul>
            )}
          </li>

          <li className="m-0 flex items-center h-16 hover:bg-indigo-700 transition-colors duration-300">
            <Link href="/dashboard/characters" className="block w-full h-full text-white flex items-center justify-center p-4 hover:text-indigo-200 transition-colors duration-300">
              Personagens
            </Link>
          </li>
          <li className="m-0 flex items-center h-16 hover:bg-indigo-700 transition-colors duration-300">
            <Link href="/dashboard/powers" className="block w-full h-full text-white flex items-center justify-center p-4 hover:text-indigo-200 transition-colors duration-300">
              Poderes
            </Link>
          </li>
          <li className="m-0 flex items-center h-16 hover:bg-indigo-700 transition-colors duration-300">
            <Link href="/dashboard/groups" className="block w-full h-full text-white flex items-center justify-center p-4 hover:text-indigo-200 transition-colors duration-300">
              Grupos
            </Link>
          </li>
          <li className="m-0 flex items-center h-16 hover:bg-indigo-700 transition-colors duration-300">
            <Link href="/dashboard/opponents" className="block w-full h-full text-white flex items-center justify-center p-4 hover:text-indigo-200 transition-colors duration-300">
              Oponentes
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
