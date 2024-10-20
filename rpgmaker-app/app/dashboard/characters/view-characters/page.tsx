"use client";

import { useCharacterContext } from "@/app/context/CharacterContext";
import CharacterDetailsContainer from "@/app/ui/character/CharacterDetailsContainer";
import CharacterList from "@/app/ui/character/CharacterList";
import CharacterSelector from "@/app/ui/character/CharacterSelector";
import ClipLoader from "react-spinners/ClipLoader";

export default function ViewCharactersPage() {
  const {
    loading,
  } = useCharacterContext();

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
        </div>
      )}
    </div>
  );
}
