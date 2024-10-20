"use client";

import { signOut } from '@/app/lib/actions';
import Link from 'next/link';
import { useState } from 'react';

const NavItem: React.FC<{ href: string; children: React.ReactNode; isSubMenu?: boolean; }> = ({ href, children, isSubMenu = false }) => {
  const itemClasses = `block w-full h-full text-white flex items-center justify-center p-4 transition-colors duration-300 ${isSubMenu ? 'hover:bg-indigo-600' : 'hover:bg-indigo-700'}`;
  const divClasses = isSubMenu ? '' : 'm-0 flex items-center h-16 hover:bg-indigo-700 transition-colors duration-300';

  return (
    <div className={divClasses}>
      <Link href={href} className={itemClasses}>
        {children}
      </Link>
    </div>
  );
};

const Navbar = () => {
  const [isCitiesMenuOpen, setIsCitiesMenuOpen] = useState(false);
  const [isCharactersMenuOpen, setIsCharactersMenuOpen] = useState(false);

  return (
    <nav className="bg-indigo-600">
      <div className="container mx-auto flex justify-between items-center h-16 relative">
        <h1 className="text-white text-xl font-bold">
          <Link href="/dashboard">
            <span className="text-white hover:text-indigo-200 transition-colors duration-300">rpgmaker</span>
          </Link>
        </h1>

        <div className={`lg:flex lg:space-x-4 items-center justify-center flex-grow hidden lg:flex`}>
          {/* Submenu de Cidades */}
          <div
            className={`relative group h-16 flex items-center hover:bg-indigo-700`}
            onMouseEnter={() => setIsCitiesMenuOpen(true)}
            onMouseLeave={() => setIsCitiesMenuOpen(false)}
          >
            <NavItem href="/dashboard/cities">Cidades</NavItem>
            {isCitiesMenuOpen && (
              <div className="absolute left-0 top-full bg-indigo-500 text-white rounded shadow-lg w-52 z-50">
                <NavItem href="/dashboard/cities/view-cities" isSubMenu>Ver Cidades</NavItem>
                <NavItem href="/dashboard/cities/add-city" isSubMenu>Adicionar Cidade</NavItem>
              </div>
            )}
          </div>

          {/* Submenu de Personagens */}
          <div
            className={`relative group h-16 flex items-center hover:bg-indigo-700`}
            onMouseEnter={() => setIsCharactersMenuOpen(true)}
            onMouseLeave={() => setIsCharactersMenuOpen(false)}
          >
            <NavItem href="/dashboard/characters">Personagens</NavItem>
            {isCharactersMenuOpen && (
              <div className="absolute left-0 top-full bg-indigo-500 text-white rounded shadow-lg w-52 z-50">
                <NavItem href="/dashboard/characters/view-characters" isSubMenu>Ver Personagens</NavItem>
                <NavItem href="/dashboard/characters/add-character" isSubMenu>Adicionar Personagem</NavItem>
              </div>
            )}
          </div>

          <NavItem href="/dashboard/powers">Poderes</NavItem>
          <NavItem href="/dashboard/groups">Grupos</NavItem>
          <NavItem href="/dashboard/opponents">Oponentes</NavItem>
        </div>

        <form action={signOut} className="ml-auto">
          <button className="font-medium rounded p-2 text-white bg-red-400 hover:bg-red-600 active:bg-red-900">
            Sign Out
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
