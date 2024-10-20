"use client";

import { useCharacterContext } from "@/app/context/CharacterContext";

const CharacterList = () => {
  const {
    characters
  } = useCharacterContext();

  const sortedCharacters = characters.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {sortedCharacters.map((character) => (
        <li key={character.id} className="py-4">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{character.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{character.goal}</p>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{character.type}</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CharacterList;
