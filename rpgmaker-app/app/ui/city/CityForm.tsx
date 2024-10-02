import { ITCity } from "@/app/lib/definitions";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormField from "./FormField";
import FormTextarea from "./FormTextArea";

export default function CityForm() {
  const [city, setCity] = useState<ITCity>({
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

  const citySizeOptions = {
    SMALL_1: "Pequena 1",
    SMALL_2: "Pequena 2",
    SMALL_3: "Pequena 3",
    MEDIUM_1: "Média 1",
    MEDIUM_2: "Média 2",
    MEDIUM_3: "Média 3",
    LARGE_1: "Grande 1",
    LARGE_2: "Grande 2",
    LARGE_3: "Grande 3",
  };

  const [errors, setErrors] = useState({ name: false });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCity((prevCity) => ({ ...prevCity, [name]: value }));
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    const values = e.target.value.split(",").map((item) => item.trim());
    setCity((prevCity) => ({ ...prevCity, [field]: values }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.name.trim() === "") {
      setErrors({ ...errors, name: true });
      return;
    }

    try {
      await axios.post("http://localhost:8082/content-back/api/cities", city);
      router.push("/dashboard");
    } catch (error) {
      console.error("Erro ao adicionar cidade:", error);
    }
  };

  return (
    <div className="container mx-auto bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md p-8 text-gray-800">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Informações Básicas</h2>
          <div className="flex justify-between gap-6">
            <div className="w-1/2">
              <FormField
                label="Nome"
                name="name"
                value={city.name}
                onChange={handleChange}
                placeholder="Nome da cidade"
                className={errors.name ? "border-red-500" : "border-gray-300"}
              />

              <FormField
                label="Título"
                name="title"
                value={city.title}
                onChange={handleChange}
                placeholder="Ex: Capital Mágica do Reino, A Veneza Cesariana"
              />
            </div>
            <div className="w-1/2">
              <FormField
                label="Líder"
                name="leader"
                value={city.leader}
                onChange={handleChange}
                placeholder="Nome do líder"
              />
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Tamanho</label>
                <select
                  name="size"
                  value={city.size}
                  onChange={handleChange}
                  className="border border-gray-300 dark:border-gray-600 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Selecione o tamanho</option>
                  {Object.entries(citySizeOptions).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
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
                value={city.places.join(", ")}
                onChange={(e) => handleArrayChange(e, "places")}
                placeholder="Ex: Taberna do Sol, Campo das Chuvas"
              />
              <FormField
                label="Pessoas"
                name="people"
                value={city.people.join(", ")}
                onChange={(e) => handleArrayChange(e, "people")}
                placeholder="Ex: João, Maria"
              />
            </div>
            <div className="w-1/2">
              <FormField
                label="Grupos"
                name="groups"
                value={city.groups.join(", ")}
                onChange={(e) => handleArrayChange(e, "groups")}
                placeholder="Ex: Guardiões do Amanhã, Soleiros de Viana"
              />
              <FormField
                label="Curiosidades"
                name="curiosities"
                value={city.curiosities.join(", ")}
                onChange={(e) => handleArrayChange(e, "curiosities")}
                placeholder="Ex: As pessoas gostam de cozinhar carne de coelho"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <FormTextarea
            label="Notas"
            name="notes"
            value={city.notes.join(", ")}
            onChange={(e) => handleArrayChange(e, "notes")}
            placeholder="Observações adicionais"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Adicionar Cidade
          </button>
        </div>
      </form>
    </div>

  );
}


