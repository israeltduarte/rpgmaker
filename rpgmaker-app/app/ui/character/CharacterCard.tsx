import React from "react";
import { ITCharacter } from "@/app/lib/definitions";

interface CharacterCardProps {
  character: ITCharacter;
  onClick: () => void;
  isSelected: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClick, isSelected }) => {
  return (
    <div
      className={`border p-4 rounded-lg shadow-md cursor-pointer ${
        isSelected ? "border-blue-500" : "border-gray-300"
      }`}
      onClick={onClick}
    >
      <h2 className="text-xl font-bold">{character.name}</h2>
      <p>Type: {character.type}</p>
      <p>Player: {character.playerName}</p>
      {/* Add any other character details you want to show here */}
    </div>
  );
};

export default CharacterCard;
