"use client";

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ITCharacter } from "../lib/definitions";
import { useRouter } from "next/navigation";

interface CharacterContextProps {
  characters: ITCharacter[];
  originalCharacter: ITCharacter | null;
  selectedCharacter: ITCharacter | null;
  loading: boolean;
  isEditingCharacter: boolean;
  searchTerm: string;
  debouncedSearchTerm: string;
  setOriginalCharacter: (originalCharacter: ITCharacter | null) => void;
  setSelectedCharacter: (selectedCharacter: ITCharacter | null) => void;
  setLoading: (loading: boolean) => void;
  setIsEditingCharacter: (editing: boolean) => void;
  setSearchTerm: (searchTerm: string) => void;
  setDebouncedSearchTerm: (debouncedSearchTerm: string) => void;

  handleAddCharacter: (character: ITCharacter) => void;
  handleUpdate: () => Promise<void>;
  handleDeleteCharacter: () => Promise<void>;
  handleSearchCharacters: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFieldChange: <K extends keyof ITCharacter>(field: K, value: ITCharacter[K]) => void;
  handleCloseCharacterDetails: () => void;
  handleEditCharacter: () => void;
  handleUndoCharacterUpdate: () => void;
  handleCardClick: (character: ITCharacter) => void;
  handleCharacterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  resetSelectedCharacter: () => void;
}

const CharacterContext = createContext<CharacterContextProps | undefined>(undefined);

export const CharacterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [characters, setCharacters] = useState<ITCharacter[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<ITCharacter | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditingCharacter, setIsEditingCharacter] = useState(false);
  const [originalCharacter, setOriginalCharacter] = useState<ITCharacter | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const router = useRouter();

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get("http://localhost:8080/content-back/api/characters");
        setCharacters(response.data.content);
      } catch (error) {
        console.error("Erro ao buscar personagens:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const handleCloseCharacterDetails = () => {
    setSelectedCharacter(null);
    setIsEditingCharacter(false);
  };

  const handleFieldChange = <K extends keyof ITCharacter>(field: K, value: ITCharacter[K]) => {
    setSelectedCharacter((prevCharacter) => {
      if (!prevCharacter) return null;

      return {
        ...prevCharacter,
        [field]: value,
      };
    });
  };

  const handleAddCharacter = async (character: ITCharacter) => {
    if (character) {
      try {
        const response = await axios.post("http://localhost:8080/content-back/api/characters", character);
        setCharacters((prevCharacters) => [...prevCharacters, response.data]);
        router.push("/dashboard");
      } catch (error) {
        console.error("Erro ao adicionar personagem:", error);
      }
    }
  };

  const handleUpdate = async () => {
    if (selectedCharacter) {
      try {
        const response = await axios.put(`http://localhost:8080/content-back/api/characters/${selectedCharacter.id}`, selectedCharacter);
        setCharacters((prevCharacters) =>
          prevCharacters.map((char) => (char.id === response.data.id ? response.data : char))
        );
        setSelectedCharacter(response.data);
        setOriginalCharacter(response.data);
        setIsEditingCharacter(false);
      } catch (error) {
        console.error("Erro ao atualizar o personagem:", error);
      }
    }
  };

  const handleDeleteCharacter = async () => {
    if (selectedCharacter) {
      try {
        await axios.delete(`http://localhost:8080/content-back/api/characters/${selectedCharacter.id}`);
        setCharacters((prevCharacters) =>
          prevCharacters.filter((char) => char.id !== selectedCharacter.id)
        );
        setSelectedCharacter(null);
      } catch (error) {
        console.error("Erro ao deletar o personagem:", error);
      }
    }
  };

  const handleEditCharacter = () => {
    if (selectedCharacter) {
      setOriginalCharacter({ ...selectedCharacter });
      setIsEditingCharacter(true);
    }
  };

  const handleUndoCharacterUpdate = () => {
    if (originalCharacter) {
      setSelectedCharacter(originalCharacter);
    }
  };

  const handleSearchCharacters = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCardClick = (character: ITCharacter) => {
    setSelectedCharacter(character);
    setIsEditingCharacter(false);
  };

  const handleCharacterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const characterId = event.target.value;
    if (characterId) {
      const character = characters.find((char) => char.id === characterId) || null;
      setSelectedCharacter(character);
    } else {
      setSelectedCharacter(null);
    }
  };

  const resetSelectedCharacter = () => {
    setSelectedCharacter(null);
  };

  return (
    <CharacterContext.Provider
      value={{
        characters,
        originalCharacter,
        selectedCharacter,
        loading,
        isEditingCharacter,
        searchTerm,
        debouncedSearchTerm,
        setOriginalCharacter,
        setSelectedCharacter,
        setLoading,
        setSearchTerm,
        setDebouncedSearchTerm,
        handleSearchCharacters,
        setIsEditingCharacter,
        handleFieldChange,
        handleCloseCharacterDetails,
        handleUpdate,
        handleDeleteCharacter,
        handleEditCharacter,
        handleUndoCharacterUpdate,
        handleCardClick,
        handleCharacterChange,
        handleAddCharacter,
        resetSelectedCharacter,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacterContext = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error("useCharacterContext deve ser usado dentro de um CharacterProvider");
  }
  return context;
};
