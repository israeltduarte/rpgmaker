"use client";

import { useCharacterContext } from "@/app/context/CharacterContext";
import { useState } from "react";

const CharacterDetailsUpdate = () => {
  const {
    selectedCharacter,
    handleCharacterFieldChange,
    updateCharacter
  } = useCharacterContext();
  
  const [character, setCharacter] = useState(selectedCharacter);

  if (!character) {
    return <div>Nenhum personagem selecionado para edição.</div>;
  }

  const handleFieldChange = (field: string, value: string) => {
    setCharacter({ ...character, [field]: value });
    handleCharacterFieldChange(field, value);
  };

  const handleSave = () => {
    updateCharacter(character);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-2">Editando {character.name}</h2>
      <input
        type="text"
        value={character.name}
        onChange={(e) => handleFieldChange("name", e.target.value)}
        className="border border-gray-300 p-2 w-full mb-4 rounded"
      />
      <textarea
        value={character.goal}
        onChange={(e) => handleFieldChange("goal", e.target.value)}
        className="border border-gray-300 p-2 w-full mb-4 rounded"
      />
      <input
        type="text"
        value={character.type}
        onChange={(e) => handleFieldChange("type", e.target.value)}
        className="border border-gray-300 p-2 w-full mb-4 rounded"
      />
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Salvar
      </button>
    </div>
  );
};

export default CharacterDetailsUpdate;
