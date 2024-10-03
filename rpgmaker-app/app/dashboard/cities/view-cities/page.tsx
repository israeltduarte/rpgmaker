"use client";

import { ITCity } from "@/app/lib/definitions";
import CityCard from "@/app/ui/city/CityCard";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoClose, IoPencil } from "react-icons/io5"; // Adicionando o ícone de edição
import ClipLoader from "react-spinners/ClipLoader";

export default function CitiesPage() {
  const [cities, setCities] = useState<ITCity[]>([]);
  const [selectedCity, setSelectedCity] = useState<ITCity | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const router = useRouter();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("http://localhost:8080/content-back/api/cities");
        setCities(response.data.content);
      } catch (error) {
        console.error("Erro ao buscar cidades:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = event.target.value;
    if (cityId) {
      const city = cities.find((c) => c.id === cityId) || null;
      setSelectedCity(city);
    } else {
      setSelectedCity(null);
    }
  };

  const handleCloseDetails = () => {
    setSelectedCity(null);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCardClick = (city: ITCity) => {
    setSelectedCity(city);
  };

  const handleEditClick = () => {
    if (selectedCity) {
      router.push(`/dashboard/cities/update-city?id=${selectedCity.id}`);
    }
  };

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    city.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Cidades</h1>

      {loading ? (
        <div className="flex justify-center">
          <ClipLoader color={"#4A5568"} size={50} />
        </div>
      ) : (
        <div>
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
              onChange={handleSearch}
              className="text-gray-900 border border-gray-300 rounded-lg p-3 w-full bg-gray-100 shadow-md focus:ring focus:ring-indigo-500 transition duration-200 ease-in-out"
            />
          </div>

          <div className="mb-6">
            <AnimatePresence>
              {selectedCity && (
                <motion.div
                  className="relative bg-white shadow-lg rounded-lg p-6 border border-gray-300 mt-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      className="text-gray-600 bg-blue-200 hover:bg-blue-400 rounded-full p-2 transition-colors duration-200"
                      onClick={handleEditClick}
                    >
                      <IoPencil size={24} />
                    </button>

                    <button
                      className="text-gray-600 bg-red-200 hover:bg-red-400 rounded-full p-2 transition-colors duration-200"
                      onClick={handleCloseDetails}
                    >
                      <IoClose size={24} />
                    </button>
                  </div>


                  <h2 className="text-4xl font-semibold text-indigo-700 mb-2">{selectedCity.name}</h2>
                  <p className="text-gray-500 mb-4 italic">{selectedCity.title}</p>
                  <p className="text-gray-800">
                    <strong>Líder:</strong> {selectedCity.leader}
                  </p>
                  <p className="text-gray-800">
                    <strong>Tamanho:</strong> {selectedCity.size}
                  </p>

                  <h3 className="text-2xl font-medium text-indigo-600 mt-4">Locais:</h3>
                  <ul className="list-disc list-inside pl-4 mb-4">
                    {selectedCity.places.map((place, index) => (
                      <li key={index} className="text-gray-600">{place}</li>
                    ))}
                  </ul>

                  <h3 className="text-2xl font-medium text-indigo-600">Pessoas:</h3>
                  <ul className="list-disc list-inside pl-4 mb-4">
                    {selectedCity.people.map((person, index) => (
                      <li key={index} className="text-gray-600">{person}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCities.map((city) => (
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
        </div>
      )}
    </div>
  );
}
