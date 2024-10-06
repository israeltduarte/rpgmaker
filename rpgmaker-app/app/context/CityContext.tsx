"use client";

import { ITCity } from '@/app/lib/definitions';
import axios from 'axios';
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from 'react';

interface CityContextProps {
  cities: ITCity[];
  originalCity: ITCity | null;
  selectedCity: ITCity | null;
  loading: boolean;
  isEditingCity: boolean;
  searchTerm: string;
  debouncedSearchTerm: string;
  setOriginalCity: (originalCity: ITCity | null) => void;
  setSelectedCity: (selectedCity: ITCity | null) => void;
  setLoading: (loading: boolean) => void;
  setIsEditingCity: (editing: boolean) => void;
  setSearchTerm: (searchTerm: string) => void;
  setDebouncedSearchTerm: (debouncedSearchTerm: string) => void;

  handleAddCity: (city: ITCity) => void;
  handleUpdate: () => Promise<void>;
  handleDeleteCity: () => Promise<void>;
  handleSearchCities: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFieldChange: (field: keyof ITCity, value: any) => void;
  handleCloseCityDetails: () => void;
  handleEdit: () => void;
  handleUndoCityUpdate: () => void;
  handleCardClick: (city: ITCity) => void;
  handleCityChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;

}

const CityContext = createContext<CityContextProps | undefined>(undefined);

export const CityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cities, setCities] = useState<ITCity[]>([]);
  const [selectedCity, setSelectedCity] = useState<ITCity | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditingCity, setIsEditingCity] = useState(false);
  const [originalCity, setOriginalCity] = useState<ITCity | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const router = useRouter();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('http://localhost:8080/content-back/api/cities');
        setCities(response.data.content);
      } catch (error) {
        console.error('Erro ao buscar cidades:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const handleCloseCityDetails = () => {
    setSelectedCity(null);
    setIsEditingCity(false);
  };

  const handleFieldChange = (field: keyof ITCity, value: any) => {
    setSelectedCity((prevCity) => {
      if (!prevCity) return null;

      const updatedCity = { ...prevCity };

      if (
        field === 'titles' ||
        field === 'places' ||
        field === 'curiosities' ||
        field === 'people' ||
        field === 'groups' ||
        field === 'notes'
      ) {
        updatedCity[field] = value.split(',').map((item: string) => item.trim());
      } else {
        updatedCity[field] = value;
      }

      return updatedCity;
    });
  };


  const handleAddCity = async (city: ITCity) => {
    if (city) {
      try {
        const response = await axios.post("http://localhost:8080/content-back/api/cities", city);
        setCities((prevCities) => [...prevCities, response.data]);
        router.push("/dashboard");
      } catch (error) {
        console.error("Erro ao adicionar cidade:", error);
      }
    }
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
        setIsEditingCity(false);
      } catch (error) {
        console.error('Erro ao atualizar a cidade:', error);
      }
    }
  };

  const handleDeleteCity = async () => {
    if (selectedCity) {
      try {
        await axios.delete(`http://localhost:8080/content-back/api/cities/${selectedCity.id}`);
        setCities((prevCities) =>
          prevCities.filter((city) => city.id !== selectedCity.id)
        );
        setSelectedCity(null);
      } catch (error) {
        console.error('Erro ao deletar a cidade:', error);
      }
    }
  };

  const handleEdit = () => {
    if (selectedCity) {
      setOriginalCity({ ...selectedCity });
      setIsEditingCity(true);
    }
  };

  const handleUndoCityUpdate = () => {
    if (originalCity) {
      setSelectedCity(originalCity);
    }
  };

  const handleSearchCities = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCardClick = (city: ITCity) => {
    setSelectedCity(city);
    setIsEditingCity(false);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = event.target.value;
    if (cityId) {
      const city = cities.find((c) => c.id === cityId) || null;
      setSelectedCity(city);
    } else {
      setSelectedCity(null);
    }
  };

  return (
    <CityContext.Provider
      value={{
        cities,
        originalCity,
        selectedCity,
        loading,
        isEditingCity,
        searchTerm,
        debouncedSearchTerm,
        setOriginalCity,
        setSelectedCity,
        setLoading,
        setSearchTerm,
        setDebouncedSearchTerm,
        handleSearchCities,
        setIsEditingCity,
        handleFieldChange,
        handleCloseCityDetails,
        handleUpdate,
        handleDeleteCity,
        handleEdit,
        handleUndoCityUpdate,
        handleCardClick,
        handleCityChange,
        handleAddCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
};

export const useCityContext = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error('useCityContext must be used within a CityProvider');
  }
  return context;
};
