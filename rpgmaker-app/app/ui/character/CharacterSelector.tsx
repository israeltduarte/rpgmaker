"use client";

import { useCharacterContext } from "@/app/context/CharacterContext";

const CharacterSelector = () => {
  const {
    characters,
    selectedCharacter,
    setSelectedCharacter
  } = useCharacterContext();

  const handleSelectCharacter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const characterId = event.target.value;
    const character = characters.find((char) => char.id === characterId);
    setSelectedCharacter(character || null);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Selecione um Personagem</label>
      <select
        value={selectedCharacter?.id || ""}
        onChange={handleSelectCharacter}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="">Escolher personagem...</option>
        {characters.map((character) => (
          <option key={character.id} value={character.id}>
            {character.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CharacterSelector;
