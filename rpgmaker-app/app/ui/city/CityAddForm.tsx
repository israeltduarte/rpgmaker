import { useCityContext } from "@/app/context/CityContext";
import { ITCity } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormField from "./CityFormField";
import FormTextarea from "./CityFormTextArea";

export default function CityAddForm() {
  const {
    handleAddCity
  } = useCityContext();

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
    updated: "",
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
    setCityTemp((prevCity) => ({ ...prevCity, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cityTemp.name.trim() === "") {
      setErrors({ ...errors, name: true });
      return;
    }

    const city: ITCity = {
      id: "",
      name: cityTemp.name,
      titles: cityTemp.titles.split(",").map((item) => item.trim()).filter(Boolean),
      leader: cityTemp.leader,
      size: cityTemp.size,
      updated: cityTemp.updated,
      places: cityTemp.places.split(",").map((item) => item.trim()).filter(Boolean),
      people: cityTemp.people.split(",").map((item) => item.trim()).filter(Boolean),
      groups: cityTemp.groups.split(",").map((item) => item.trim()).filter(Boolean),
      curiosities: cityTemp.curiosities.split(",").map((item) => item.trim()).filter(Boolean),
      notes: cityTemp.notes.split(",").map((item) => item.trim()).filter(Boolean),
    };

    try {
      handleAddCity(city); // Usando a função do contexto para adicionar a cidade
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
                value={cityTemp.name}
                onChange={handleChange}
                placeholder="Nome da cidade"
                className={errors.name ? "border-red-500" : "border-gray-300"}
              />

              <FormField
                label="Título"
                name="titles"
                value={cityTemp.titles}
                onChange={handleChange}
                placeholder="Ex: Capital Mágica do Reino, A Veneza Cesariana"
              />
            </div>
            <div className="w-1/2">
              <FormField
                label="Líder"
                name="leader"
                value={cityTemp.leader}
                onChange={handleChange}
                placeholder="Nome do líder"
              />
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Tamanho</label>
                <select
                  name="size"
                  value={cityTemp.size}
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
                value={cityTemp.places}
                onChange={handleChange}
                placeholder="Ex: Taberna do Sol, Campo das Chuvas"
              />
              <FormField
                label="Pessoas"
                name="people"
                value={cityTemp.people}
                onChange={handleChange}
                placeholder="Ex: João, Maria"
              />
            </div>
            <div className="w-1/2">
              <FormField
                label="Grupos"
                name="groups"
                value={cityTemp.groups}
                onChange={handleChange}
                placeholder="Ex: Guardiões do Amanhã, Soleiros de Viana"
              />
              <FormField
                label="Curiosidades"
                name="curiosities"
                value={cityTemp.curiosities}
                onChange={handleChange}
                placeholder="Ex: As pessoas gostam de cozinhar carne de coelho"
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
            Adicionar Cidade
          </button>
        </div>
      </form>
    </div>
  );
}
