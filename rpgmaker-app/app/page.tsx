"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaCity, FaStickyNote, FaUsers } from 'react-icons/fa';

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-indigo-600 text-indigo-600 p-6">
      <motion.h1
        className="text-5xl font-bold mb-8 text-gray-100"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        rpgmaker
      </motion.h1>
      <motion.p
        className="text-lg mb-6 text-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Crie e gerencie seu mundo de RPG com facilidade!
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        <div className="bg-white rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105 animate-fade-in flex flex-col items-center">
          <FaCity className="text-4xl text-green-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Gerenciamento de Cidades</h2>
          <p className="text-gray-700 text-center">Crie e organize as cidades do seu mundo, definindo líderes, características e curiosidades.</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105 animate-fade-in flex flex-col items-center">
          <FaUsers className="text-4xl text-blue-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Personagens e Grupos</h2>
          <p className="text-gray-700 text-center">Gerencie os personagens e grupos que habitam seu mundo, com detalhes e histórias únicas.</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105 animate-fade-in flex flex-col items-center">
          <FaStickyNote className="text-4xl text-yellow-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Notas e Curiosidades</h2>
          <p className="text-gray-700 text-center">Mantenha todas as suas anotações e curiosidades organizadas em um só lugar.</p>
        </div>
      </div>

      <nav className="flex flex-col space-y-4">
        <Link href="/login" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200">
          Acessar Conta
        </Link>
      </nav>
    </div>
  );
}
