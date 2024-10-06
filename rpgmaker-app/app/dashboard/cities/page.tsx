"use client";

import { useCityContext } from "@/app/context/CityContext";


const CitiesDashboardPage = () => {

  const {
    cities,
    loading
  } = useCityContext();

  const sortedCities = cities.sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime());

  return (
    <div className="container mx-auto p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
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
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition duration-300 transform hover:shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Últimas Cidades
              </h3>
              <ul className="text-gray-700 dark:text-gray-300">
                {sortedCities.map((city) => (
                  <li key={city.id} className="border-b border-gray-200 dark:border-gray-600 pb-2 mb-2">
                    <strong>{city.name}:</strong> {city.titles}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition duration-300 transform hover:shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Estatísticas de Cidades
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Total de Cidades: {sortedCities.length}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CitiesDashboardPage;
