"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ITCity } from "@/app/lib/definitions";

export default function CitiesPage() {
  const [cities, setCities] = useState<ITCity[]>([]);
  const [selectedCity, setSelectedCity] = useState<ITCity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("http://localhost:8082/content-back/api/cities");
        setCities(response.data.content);
      } catch (error) {
        console.error("Erro ao buscar cidades:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const handleCityChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = event.target.value;
    if (cityId) {
      const city = cities.find((c) => c.id === cityId) || null;
      setSelectedCity(city);
    } else {
      setSelectedCity(null);
    }
  };

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-5xl font-bold text-center mb-8 text-brown-900">Cidades</h1>
      <div className="mb-6">
        <select onChange={handleCityChange} className="text-gray-600 border border-gray-700 rounded-lg p-2 w-full max-w-xs mx-auto bg-beige-200 shadow-md focus:ring focus:ring-brown-600 transition duration-200 ease-in-out">
          <option value="" >Escolha uma cidade</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      {selectedCity && (
        <div className="bg-beige-100 shadow-lg rounded-lg p-6 border border-gray-700">
          <h2 className="text-4xl font-semibold text-brown-900 mb-2">{selectedCity.name}</h2>
          <p className="text-gray-700 mb-4 italic">{selectedCity.title}</p>
          <p className="text-brown-800"><strong>Líder:</strong> {selectedCity.leader}</p>
          <p className="text-brown-800"><strong>Tamanho:</strong> {selectedCity.size}</p>
          
          <h3 className="text-2xl font-medium text-brown-700 mt-4">Locais:</h3>
          <ul className="list-disc list-inside pl-4 mb-4">
            {selectedCity.places.map((place, index) => (
              <li key={index} className="text-gray-600">{place}</li>
            ))}
          </ul>
          
          <h3 className="text-2xl font-medium text-brown-700">Pessoas:</h3>
          <ul className="list-disc list-inside pl-4 mb-4">
            {selectedCity.people.map((person, index) => (
              <li key={index} className="text-gray-600">{person}</li>
            ))}
          </ul>
          
          <h3 className="text-2xl font-medium text-brown-700">Grupos:</h3>
          <ul className="list-disc list-inside pl-4 mb-4">
            {selectedCity.groups.map((group, index) => (
              <li key={index} className="text-gray-600">{group}</li>
            ))}
          </ul>
          
          <h3 className="text-2xl font-medium text-brown-700">Curiosidades:</h3>
          <ul className="list-disc list-inside pl-4 mb-4">
            {selectedCity.curiosities.map((curiosity, index) => (
              <li key={index} className="text-gray-600">{curiosity}</li>
            ))}
          </ul>
          
          <h3 className="text-2xl font-medium text-brown-700">Notas:</h3>
          <ul className="list-disc list-inside pl-4 mb-4">
            {selectedCity.notes.map((note, index) => (
              <li key={index} className="text-gray-600">{note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
