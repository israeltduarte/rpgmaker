"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { useCityContext } from "../context/CityContext";
import { useUtilsContext } from "../context/UtilsContext";
import { ITCharacter } from "../lib/definitions";

const DashboardPage = () => {
  const [characters, setCharacters] = useState<ITCharacter[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);

  const {
    cities,
    loading
  } = useCityContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const charactersResponse = await axios.get("http://localhost:8080/content-back/api/characters?size=5&sort=updated,desc");
        setCharacters(charactersResponse.data.content);
      } catch (error) {
        console.error("Erro ao buscar dados de personagens:", error);
      }
    };

    fetchData();
  }, []);

  const {
    todos,
    deleteTodo
  } = useUtilsContext();

  const sortedCities = cities.sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime());

  const toggleInputVisibility = () => { setIsInputVisible(!isInputVisible); };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition duration-300 transform hover:shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Últimas Cidades</h3>
          <ul className="text-gray-700 dark:text-gray-300 flex flex-col space-y-2">
            {sortedCities.map((city) => (
              <li key={city.id} className="border-b border-gray-200 dark:border-gray-600 pb-2">
                <strong>{city.name}:</strong> {city.titles}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition duration-300 transform hover:shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Últimos Personagens</h3>
          <ul className="text-gray-700 dark:text-gray-300 flex flex-col space-y-2">
            {characters.map((character) => (
              <li key={character.id} className="border-b border-gray-200 dark:border-gray-600 pb-2">
                <strong>{character.name}:</strong> {character.playerName}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition duration-300 transform hover:shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Estatísticas do Sistema</h3>
          <p className="text-gray-700 dark:text-gray-300">Total de Cidades: {sortedCities.length}</p>
          <p className="text-gray-700 dark:text-gray-300">Total de Personagens: {characters.length}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition duration-300 transform hover:shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Lista de Tarefas</h3>

          <div className="absolute top-4 right-4">
            <button
              onClick={toggleInputVisibility}
              className="text-gray-600 bg-blue-200 hover:bg-blue-400 rounded-full p-2 transition-colors duration-200"
            >
              <IoAdd size={20} />
            </button>
          </div>

          {isInputVisible && (
            <form onSubmit={handleSubmit} className="mb-4">
              <input
                type="text"
                value={newTodo}
                placeholder="Nova tarefa"
                className="w-full p-2 mb-2 border rounded text-gray-800"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
              >
                Adicionar Tarefa
              </button>
            </form>
          )}

          {todos.length === 0 ? (
            <p className="text-gray-700 dark:text-gray-300">
              Nenhuma tarefa encontrada.
            </p>
          ) : (
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              {todos.map((todo, index) => (
                <li key={index} className="flex justify-between items-center mb-2">
                  {todo.name}
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
