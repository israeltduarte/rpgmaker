"use client";

import { useCityContext } from "@/app/context/CityContext"; // ajuste o caminho conforme necessário
import CityDetailsContainer from "@/app/ui/city/CityDetailsContainer";
import CityList from "@/app/ui/city/CityList";
import CitySelector from "@/app/ui/city/CitySelector";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function ViewCitiesPage() {
  const {
    searchTerm,
    debouncedSearchTerm,
    setDebouncedSearchTerm,
    cities,
    loading
  } = useCityContext();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Cidades</h1>

      {loading ? (
        <div className="flex justify-center">
          <ClipLoader color={"#4A5568"} size={50} />
        </div>
      ) : (
        <div>

          <CitySelector />

          <CityDetailsContainer />

          <CityList />

          {filteredCities.length === 0 && !loading && (
            <div className="text-center text-gray-500">
              Nenhuma cidade encontrada.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
