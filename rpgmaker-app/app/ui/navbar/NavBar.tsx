"use client";

import Link from 'next/link';
import { useState } from 'react';
import NavItem from './NavItem';

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

        <div className={`lg:flex lg:space-x-4 items-center absolute lg:relative lg:top-0 lg:left-0`}>
          {/* Item de Cidades com submenu */}
          <div
            className={`relative group h-16 flex items-center hover:bg-indigo-700`}
            onMouseEnter={() => setIsCitiesMenuOpen(true)}
            onMouseLeave={() => setIsCitiesMenuOpen(false)}
          >
            <NavItem href="/dashboard/cities">Cidades</NavItem>
            {isCitiesMenuOpen && (
              <div className="absolute left-0 top-full bg-indigo-400 text-white rounded shadow-lg w-48 z-50">
                <NavItem href="/dashboard/cities/add-city" isSubMenu>
                  Adicionar Cidade
                </NavItem>
                <NavItem href="/dashboard/cities/view-cities" isSubMenu>
                  Ver Cidades
                </NavItem>
              </div>
            )}
          </div>

          {/* Outros itens */}
          <NavItem href="/dashboard/characters">Personagens</NavItem>
          <NavItem href="/dashboard/powers">Poderes</NavItem>
          <NavItem href="/dashboard/groups">Grupos</NavItem>
          <NavItem href="/dashboard/opponents">Oponentes</NavItem>
        </div>
      </div>
    </nav>
  );
}
