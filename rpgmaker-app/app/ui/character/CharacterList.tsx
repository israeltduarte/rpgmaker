"use client";

import { useCharacterContext } from "@/app/context/CharacterContext";
import CharacterCard from "@/app/ui/character/CharacterCard";
import React, { useEffect } from "react";

const CharacterList: React.FC = () => {
  const {
    loading,
    characters,
    selectedCharacter,
    searchTerm,
    debouncedSearchTerm,
    handleCardClick,
    setDebouncedSearchTerm,
  } = useCharacterContext();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  const sortedCharacters = filteredCharacters.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedCharacters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onClick={() => handleCardClick(character)}
            isSelected={selectedCharacter?.id === character.id}
          />
        ))}
      </div>

      {filteredCharacters.length === 0 && !loading && (
        <div className="text-center text-gray-500">
          Nenhum personagem encontrado.
        </div>
      )}
    </>
  );
};

export default CharacterList;
