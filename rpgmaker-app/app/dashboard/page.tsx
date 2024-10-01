"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { signOut } from "../lib/actions";
import { ITCharacter, ITCity } from "../lib/definitions";

export default function DashboardPage() {
  const [cities, setCities] = useState<ITCity[]>([]);
  const [characters, setCharacters] = useState<ITCharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citiesResponse, charactersResponse] = await Promise.all([
          axios.get("http://localhost:8082/content-back/api/cities?limit=5&sort=updated,desc"),
          axios.get("http://localhost:8082/content-back/api/characters?limit=5&sort=updated,desc"),
        ]);

        setCities(citiesResponse.data.content);
        setCharacters(charactersResponse.data.content);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
      setNewTodo("");
    }
  };

  const handleRemoveTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-yellow-500">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Últimas Cidades</h3>
            <ul className="text-gray-700 dark:text-gray-300">
              {cities.map((city) => (
                <li key={city.id}>
                  <strong>{city.name}:</strong> {city.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-blue-500">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Últimos Personagens</h3>
            <ul className="text-gray-700 dark:text-gray-300">
              {characters.map((character) => (
                <li key={character.id}>
                  <strong>{character.name}:</strong> {character.playerName}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-green-500">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Estatísticas do Sistema</h3>
            <p className="text-gray-700 dark:text-gray-300">Total de Cidades: {cities.length}</p>
            <p className="text-gray-700 dark:text-gray-300">Total de Personagens: {characters.length}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-red-500">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">To-Do List</h3>
            <form onSubmit={handleAddTodo} className="mb-4">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Nova tarefa..."
                className="w-full p-2 mb-2 border rounded"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
              >
                Adicionar Tarefa
              </button>
            </form>

            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              {todos.map((todo, index) => (
                <li key={index} className="flex justify-between items-center mb-2">
                  {todo}
                  <button
                    onClick={() => handleRemoveTodo(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form action={signOut} className="mt-8">
          <button className="flex font-medium text-red-600 dark:text-red-500 hover:underline">
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </>
  );
}
