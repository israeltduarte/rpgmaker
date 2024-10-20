import { useCharacterContext } from "@/app/context/CharacterContext";
import { ITCharacter, ITCharacterTypeEnum } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormField from "../utils/FormField";
import FormTextarea from "../utils/FormTextArea";

const CharacterAddForm = () => {
  const {
    handleAddCharacter
  } = useCharacterContext();

  const router = useRouter();

  const [characterTemp, setCharacterTemp] = useState<ITCharacter>({
    id: "",
    name: "",
    type: ITCharacterTypeEnum.PDM,
    tendency: "",
    reward: "",
    goal: "",
    isRival: false,
    playerName: "",
    power: undefined,
    notes: [],
  });

  const [errors, setErrors] = useState({ name: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setCharacterTemp((prevCharacter) => ({
      ...prevCharacter,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : (name === "reward" ? Number(value) : value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (characterTemp.name.trim() === "") {
      setErrors({ ...errors, name: true });
      return;
    }

    try {
      handleAddCharacter(characterTemp);
      router.push("/characters/dashboard");
    } catch (error) {
      console.error("Erro ao adicionar personagem:", error);
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
                value={characterTemp.name}
                onChange={handleChange}
                placeholder="Nome do personagem"
                className={errors.name ? "border-red-500" : "border-gray-300"}
              />
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Tipo</label>
                <select
                  name="type"
                  value={characterTemp.type}
                  onChange={handleChange}
                  className="border border-gray-300 dark:border-gray-600 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {Object.values(ITCharacterTypeEnum).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-1/2">
              <FormField
                label="Tendência"
                name="tendency"
                value={characterTemp.tendency}
                onChange={handleChange}
                placeholder="Tendência do personagem"
              />
              <FormField
                label="Recompensa"
                name="reward"
                value={characterTemp.reward}
                onChange={handleChange}
                placeholder="Recompensa por capturá-lo"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Outros Detalhes</h2>
          <div className="flex justify-between gap-6">
            <div className="w-1/2">
              <FormField
                label="Objetivo"
                name="goal"
                value={characterTemp.goal}
                onChange={handleChange}
                placeholder="Objetivo do personagem"
              />
              <FormField
                label="Nome do Jogador"
                name="playerName"
                value={characterTemp.playerName}
                onChange={handleChange}
                placeholder="Nome do jogador"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">É Rival?</label>
              <input
                type="checkbox"
                name="isRival"
                checked={characterTemp.isRival}
                onChange={handleChange}
                className="border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>
        </div>

        <FormTextarea
          label="Notas"
          name="notes"
          value={characterTemp.notes.join(", ")}
          onChange={handleChange}
          placeholder="Notas adicionais (separar por vírgula)"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Adicionar Personagem
          </button>
        </div>
      </form>
    </div>
  );
};

export default CharacterAddForm;
