import { useCityContext } from "@/app/context/CityContext";
import React from "react";

const CitySelector: React.FC = () => {
  const {
    cities,
    searchTerm,
    handleSearchCities,
    handleCityChange,
  } = useCityContext();

  return (
    <div className="mb-6 flex items-center gap-4 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <select
        onChange={handleCityChange}
        className="text-gray-600 border border-gray-300 rounded-lg p-3 w-full max-w-xs bg-gray-100 shadow-md focus:ring focus:ring-indigo-500 transition duration-200 ease-in-out"
      >
        <option value="">Escolha uma cidade</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Pesquisar cidades..."
        value={searchTerm}
        onChange={handleSearchCities}
        className="text-gray-900 border border-gray-300 rounded-lg p-3 w-full bg-gray-100 shadow-md focus:ring focus:ring-indigo-500 transition duration-200 ease-in-out"
      />
    </div>
  );
};

export default CitySelector;
