"use client";

import CityForm from "@/app/ui/city/CityForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddCityPage() {
  const [city, setCity] = useState({
    name: "",
    title: "",
    leader: "",
    size: "",
    places: [],
    people: [],
    groups: [],
    curiosities: [],
    notes: [],
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCity((prevCity) => ({ ...prevCity, [name]: value }));
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLTextAreaElement>, field: string) => {
    const values = e.target.value.split(",").map(item => item.trim());
    setCity((prevCity) => ({ ...prevCity, [field]: values }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8082/content-back/api/cities", city);
      router.push("/dashboard");
    } catch (error) {
      console.error("Erro ao adicionar cidade:", error);
    }
  };

  return (
    <div className="container mx-auto bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Adicionar de Cidades</h1>
      <CityForm />
    </div>
  );
}
