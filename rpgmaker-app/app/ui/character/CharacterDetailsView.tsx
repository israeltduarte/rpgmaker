"use client";

import { useCharacterContext } from "@/app/context/CharacterContext";

const CharacterDetailsView = () => {
  const {
    selectedCharacter
  } = useCharacterContext();

  if (!selectedCharacter) return null;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-2">{selectedCharacter.name}</h2>
      <p className="text-gray-700 dark:text-gray-300">Meta: {selectedCharacter.goal}</p>
      <p className="text-gray-700 dark:text-gray-300">Tipo: {selectedCharacter.type}</p>
      <p className="text-gray-700 dark:text-gray-300">Recompensa: {selectedCharacter.reward}</p>
      <p className="text-gray-700 dark:text-gray-300">Jogador: {selectedCharacter.playerName}</p>
      <p className="text-gray-700 dark:text-gray-300">Notas:</p>
      <ul>
        {selectedCharacter.notes.length > 0 ? (
          selectedCharacter.notes.map((note, index) => (
            <li key={index} className="text-gray-600 dark:text-gray-400">{note}</li>
          ))
        ) : (
          <li className="text-gray-600 dark:text-gray-400">Sem notas.</li>
        )}
      </ul>
    </div>
  );
};

export default CharacterDetailsView;
