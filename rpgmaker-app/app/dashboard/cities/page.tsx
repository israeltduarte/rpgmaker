"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { ITCity } from "../../lib/definitions";

export default function CitiesDashboardPage() {
  const [cities, setCities] = useState<ITCity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const citiesResponse = await axios.get(
          "http://localhost:8080/content-back/api/cities?size=10&sort=updated,desc"
        );
        setCities(citiesResponse.data.content);
      } catch (error) {
        console.error("Erro ao buscar cidades:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  

  return (
    <>
      <div
        className={`container mx-auto p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md`}
      >
        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-900"></div>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Dashboard de Cidades
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-yellow-500">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Últimas Cidades
                </h3>
                <ul className="text-gray-700 dark:text-gray-300">
                  {cities.map((city) => (
                    <li key={city.id}>
                      <strong>{city.name}:</strong> {city.titles}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-green-500">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Estatísticas de Cidades
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Total de Cidades: {cities.length}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
