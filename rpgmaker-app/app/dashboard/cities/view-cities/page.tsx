"use client";

import { ITCity } from "@/app/lib/definitions";
import CityDetailsContainer from "@/app/ui/city/CityDetailsContainer";
import CityList from "@/app/ui/city/CityList";
import CitySelector from "@/app/ui/city/CitySelector";
import axios from "axios";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function ViewCitiesPage() {
  const [cities, setCities] = useState<ITCity[]>([]);
  const [selectedCity, setSelectedCity] = useState<ITCity | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [isEditing, setIsEditing] = useState(false);
  const [originalCity, setOriginalCity] = useState<ITCity | null>(null);

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
    setIsEditing(false);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCardClick = (city: ITCity) => {
    setSelectedCity(city);
    setIsEditing(false);
  };

  const handleFieldChange = (field: keyof ITCity, value: any) => {
    setSelectedCity((prevCity) => {
      if (!prevCity) return null;

      const updatedCity = { ...prevCity };

      if (
        field === "titles" ||
        field === "places" ||
        field === "curiosities" ||
        field === "people" ||
        field === "groups" ||
        field === "notes"
      ) {
        updatedCity[field] = value.split(",");
      } else {
        updatedCity[field] = value;
      }

      return updatedCity;
    });
  };

  const handleUpdate = async () => {
    if (selectedCity) {
      try {
        const response = await axios.put(`http://localhost:8080/content-back/api/cities/${selectedCity.id}`, selectedCity);
        setCities((prevCities) =>
          prevCities.map((city) => (city.id === response.data.id ? response.data : city))
        );
        setSelectedCity(response.data);
        setOriginalCity(response.data);
        setIsEditing(false);
      } catch (error) {
        console.error("Erro ao atualizar a cidade:", error);
      }
    }
  };

  const handleDeleteConfirmation = async (response: boolean) => {
    if (selectedCity) {
      try {
        await axios.delete(`http://localhost:8080/content-back/api/cities/${selectedCity.id}`);

        setCities((prevCities) => prevCities.filter((city) => city.id !== selectedCity.id));

        setSelectedCity(null);
      } catch (error) {
        console.error("Erro ao deletar a cidade:", error);
      }
    }
  }

  const handleEdit = () => {
    if (selectedCity) {
      setOriginalCity({ ...selectedCity });
      setIsEditing(true);
    }
  };

  const handleUndo = () => {
    if (originalCity) {
      setSelectedCity(originalCity)
      handleCardClick(originalCity);
    }
  };

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    // ||
    // city.titles.forEach((element) => element.toLocaleLowerCase().includes(debouncedSearchTerm.toLowerCase()))
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
          <CitySelector
            cities={cities}
            onCityChange={handleCityChange}
            searchTerm={searchTerm}
            onSearch={handleSearch}
          />

          <CityDetailsContainer
            selectedCity={selectedCity}
            isEditing={isEditing}
            handleClose={handleCloseDetails}
            handleEdit={handleEdit}
            handleFieldChange={handleFieldChange}
            handleUpdate={handleUpdate}
            handleDeleteConfirmation={handleDeleteConfirmation}
            handleUndo={handleUndo}
          />

          <CityList
            cities={filteredCities}
            onCityClick={handleCardClick}
            selectedCityId={selectedCity?.id}
          />

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
