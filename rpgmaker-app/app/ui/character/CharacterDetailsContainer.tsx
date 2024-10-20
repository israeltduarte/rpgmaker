"use client";

import { useCharacterContext } from "@/app/context/CharacterContext";
import { useEffect } from "react";
import CharacterDetailsUpdate from "./CharacterDetailsUpdate";
import CharacterDetailsView from "./CharacterDetailsView";

const CharacterDetailsContainer = () => {
  const {
    isEditingCharacter,
    setSelectedCharacter,
    setSearchTerm,
  } = useCharacterContext();

  useEffect(() => {
    setSelectedCharacter(null);
    setSearchTerm("");
  }, [setSelectedCharacter, setSearchTerm]);

  return isEditingCharacter ? <CharacterDetailsUpdate /> : <CharacterDetailsView />;
};

export default CharacterDetailsContainer;
