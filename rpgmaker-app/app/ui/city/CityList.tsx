import { useCityContext } from "@/app/context/CityContext";
import CityCard from "@/app/ui/city/CityCard";
import React, { useEffect } from "react";

const CityList: React.FC = () => {
  const {
    loading,
    cities,
    selectedCity,
    searchTerm,
    debouncedSearchTerm,
    handleCardClick,
    setDebouncedSearchTerm,
  } = useCityContext();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);


  const filteredCities = cities.filter((city) => city.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));

  const sortedCities = filteredCities.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedCities.map((city) => (
          <CityCard
            key={city.id}
            city={city}
            onClick={() => handleCardClick(city)}
            isSelected={selectedCity?.id === city.id}
          />
        ))}
      </div>

      {filteredCities.length === 0 && !loading && (
        <div className="text-center text-gray-500">
          Nenhuma cidade encontrada.
        </div>
      )}
    </>
  );
};

export default CityList;
