"use client";

import { useCharacterContext } from "@/app/context/CharacterContext";
import CharacterDetailsContainer from "@/app/ui/character/CharacterDetailsContainer";
import CharacterList from "@/app/ui/character/CharacterList";
import CharacterSelector from "@/app/ui/character/CharacterSelector";
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function ViewCharactersPage() {
  const {
    characters,
    loading,
    searchTerm,
    debouncedSearchTerm,
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

  const filteredCharacters = characters.filter((character) => character.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Personagens</h1>

      {loading ? (
        <div className="flex justify-center">
          <ClipLoader color={"#4A5568"} size={50} />
        </div>
      ) : (
        <div>
          <CharacterSelector />

          <CharacterDetailsContainer />

          <CharacterList />

          {filteredCharacters.length === 0 && !loading && (
            <div className="text-center text-gray-500">
              Nenhum personagem encontrado.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
