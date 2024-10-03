"use client";

import { ITCity } from "@/app/lib/definitions";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormField from "./FormField";

interface UpdateCityFormProps {
  city: ITCity;
  onSubmit: (city: ITCity) => void;
}

export default function UpdateCityForm({ city }: UpdateCityFormProps) {
  const [errors, setErrors] = useState({ name: false });
  const router = useRouter();
  const [formData, setFormData] = useState<ITCity>({
    id: "",
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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.name.trim() === "") {
      setErrors({ ...errors, name: true });
      return;
    }

    try {
      await axios.post("http://localhost:8080/content-back/api/cities", city);
      router.push("/dashboard");
    } catch (error) {
      console.error("Erro ao adicionar cidade:", error);
    }
  };

  return (
    <div className="container mx-auto bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md text-gray-800">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Informações Básicas</h2>
          <div className="flex justify-between gap-6">
            <div className="w-1/2">
              <FormField
                label="Nome"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nome da cidade"
                required
              />

              <FormField
                label="Título"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Título da cidade"
                required
              />
            </div>
            <div className="w-1/2">
              <FormField
                label="Líder"
                name="leader"
                value={formData.leader}
                onChange={handleChange}
                placeholder="Líder da cidade"
                required
              />
              <FormField
                label="Tamanho"
                name="size"
                value={formData.size}
                onChange={handleChange}
                placeholder="Tamanho da cidade"
                required
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Detalhes Adicionais</h2>
          <div className="flex justify-between gap-6">
            <div className="w-1/2">
              <FormField
                label="Locais"
                name="places"
                value={formData.places.join(", ")} // Junte os locais para mostrar em um input
                onChange={(e) => setFormData({ ...formData, places: e.target.value.split(", ") })}
                placeholder="Separar locais por vírgula"
              />
              <FormField
                label="Pessoas"
                name="people"
                value={formData.people.join(", ")} // Junte as pessoas para mostrar em um input
                onChange={(e) => setFormData({ ...formData, people: e.target.value.split(", ") })}
                placeholder="Separar pessoas por vírgula"
              />
            </div>
            <div className="w-1/2">
              <FormField
                label="Locais"
                name="places"
                value={formData.places.join(", ")} // Junte os locais para mostrar em um input
                onChange={(e) => setFormData({ ...formData, places: e.target.value.split(", ") })}
                placeholder="Separar locais por vírgula"
              />
              <FormField
                label="Pessoas"
                name="people"
                value={formData.people.join(", ")} // Junte as pessoas para mostrar em um input
                onChange={(e) => setFormData({ ...formData, people: e.target.value.split(", ") })}
                placeholder="Separar pessoas por vírgula"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Atualizar Cidade
          </button>
        </div>
      </form>
    </div>

  );
}
