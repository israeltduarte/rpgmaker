"use client";

import { ITCity } from "@/app/lib/definitions";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormField from "./FormField";
import FormTextarea from "./FormTextArea";

interface UpdateCityFormProps {
  city: ITCity;
}

export default function UpdateCityForm({ city }: UpdateCityFormProps) {
  console.log("UPDATE CITY FORM: " + city);
  const [errors, setErrors] = useState({ name: false });
  const router = useRouter();
  const [cityTemp, setCityTemp] = useState({
    id: "",
    name: "",
    titles: "",
    leader: "",
    size: "",
    places: "",
    people: "",
    groups: "",
    curiosities: "",
    notes: "",
  });

  useEffect(() => {
    if (city) {
      setCityTemp({
        id: city.id,
        name: city.name,
        leader: city.leader,
        size: city.size,
        titles: city.titles.join(", "),
        places: city.places.join(", "),
        people: city.people.join(", "),
        groups: city.groups.join(", "),
        curiosities: city.curiosities.join(", "),
        notes: city.notes.join(", "),
      });
    }
  }, [city]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setCityTemp({ ...cityTemp, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cityTemp.name.trim() === "") {
      setErrors({ ...errors, name: true });
      return;
    }

    const updatedCity = {
      ...cityTemp,
      titles: cityTemp.titles.split(", ").filter(Boolean),
      places: cityTemp.places.split(", ").filter(Boolean),
      people: cityTemp.people.split(", ").filter(Boolean),
      groups: cityTemp.groups.split(", ").filter(Boolean),
      curiosities: cityTemp.curiosities.split(", ").filter(Boolean),
      notes: cityTemp.notes.split(", ").filter(Boolean),
    };

    console.log(updatedCity);

    try {
      await axios.put(`http://localhost:8080/content-back/api/cities/${updatedCity.id}`, updatedCity);
      router.push("/dashboard");
    } catch (error) {
      console.error("Erro ao atualizar cidade:", error);
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
                value={cityTemp.name}
                onChange={handleChange}
                placeholder="Nome da cidade"
                required
              />
              <FormField
                label="Título"
                name="title"
                value={cityTemp.titles}
                onChange={handleChange}
                placeholder="Título da cidade"
                required
              />
            </div>
            <div className="w-1/2">
              <FormField
                label="Líder"
                name="leader"
                value={cityTemp.leader}
                onChange={handleChange}
                placeholder="Líder da cidade"
                required
              />
              <FormField
                label="Tamanho"
                name="size"
                value={cityTemp.size}
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
                value={cityTemp.places}
                onChange={handleChange}
                placeholder="Separar locais por vírgula"
              />
              <FormField
                label="Pessoas"
                name="people"
                value={cityTemp.people}
                onChange={handleChange}
                placeholder="Separar pessoas por vírgula"
              />
            </div>
            <div className="w-1/2">
              <FormField
                label="Grupos"
                name="groups"
                value={cityTemp.groups}
                onChange={handleChange}
                placeholder="Separar grupos por vírgula"
              />
              <FormField
                label="Curiosidades"
                name="curiosities"
                value={cityTemp.curiosities}
                onChange={handleChange}
                placeholder="Separar curiosidades por vírgula"
              />
            </div>
          </div>
        </div>

        <FormTextarea
          label="Notas"
          name="notes"
          value={cityTemp.notes}
          onChange={handleChange}
          placeholder="Observações adicionais"
        />

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
