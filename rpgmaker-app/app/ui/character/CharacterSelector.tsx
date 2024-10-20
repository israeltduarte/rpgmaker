"use client";

import { useCharacterContext } from "@/app/context/CharacterContext";

const CharacterSelector = () => {
  const {
    characters,
    selectedCharacter,
    searchTerm,
    handleCharacterChange,
    handleSearchCharacter,
  } = useCharacterContext();

  return (

    <div className="mb-6 flex items-center gap-4 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <select
        value={selectedCharacter?.id || ""}
        onChange={handleCharacterChange}
        className="text-gray-600 border border-gray-300 rounded-lg p-3 w-full max-w-xs bg-gray-100 shadow-md focus:ring focus:ring-indigo-500 transition duration-200 ease-in-out"
      >
        <option value="">Escolher personagem...</option>
        {characters.map((character) => (
          <option key={character.id} value={character.id}>
            {character.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Pesquisar cidades..."
        value={searchTerm}
        onChange={handleSearchCharacter}
        className="text-gray-900 border border-gray-300 rounded-lg p-3 w-full bg-gray-100 shadow-md focus:ring focus:ring-indigo-500 transition duration-200 ease-in-out"
      />
    </div>
  );
};

export default CharacterSelector;
