"use client";

import { useCharacterContext } from "@/app/context/CharacterContext";
import CharacterDetailsUpdate from "./CharacterDetailsUpdate";
import CharacterDetailsView from "./CharacterDetailsView";

const CharacterDetailsContainer = () => {
  const {
    isEditingCharacter
  } = useCharacterContext();

  return isEditingCharacter ? <CharacterDetailsUpdate /> : <CharacterDetailsView />;
};

export default CharacterDetailsContainer;
