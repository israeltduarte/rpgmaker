"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">Adicionar Cidade</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div>
          <label className="block mb-2">Nome:</label>
          <input
            type="text"
            name="name"
            value={city.name}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Título:</label>
          <input
            type="text"
            name="title"
            value={city.title}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Líder:</label>
          <input
            type="text"
            name="leader"
            value={city.leader}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Tamanho:</label>
          <input
            type="text"
            name="size"
            value={city.size}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Locais (separados por vírgula):</label>
          <textarea
            name="places"
            onChange={(e) => handleArrayChange(e, "places")}
            className="border rounded p-2 w-full"
          ></textarea>
        </div>
        <div>
          <label className="block mb-2">Pessoas (separadas por vírgula):</label>
          <textarea
            name="people"
            onChange={(e) => handleArrayChange(e, "people")}
            className="border rounded p-2 w-full"
          ></textarea>
        </div>
        <div>
          <label className="block mb-2">Grupos (separados por vírgula):</label>
          <textarea
            name="groups"
            onChange={(e) => handleArrayChange(e, "groups")}
            className="border rounded p-2 w-full"
          ></textarea>
        </div>
        <div>
          <label className="block mb-2">Curiosidades (separadas por vírgula):</label>
          <textarea
            name="curiosities"
            onChange={(e) => handleArrayChange(e, "curiosities")}
            className="border rounded p-2 w-full"
          ></textarea>
        </div>
        <div>
          <label className="block mb-2">Notas (separadas por vírgula):</label>
          <textarea
            name="notes"
            onChange={(e) => handleArrayChange(e, "notes")}
            className="border rounded p-2 w-full"
          ></textarea>
        </div>
        <button type="submit" className="mt-4 bg-blue-600 text-white p-2 rounded">
          Adicionar Cidade
        </button>
      </form>
    </div>
  );
}
