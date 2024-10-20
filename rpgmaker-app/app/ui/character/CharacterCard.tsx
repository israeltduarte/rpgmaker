import { CharacterCardProps } from "@/app/lib/definitions";

const CharacterCard = ({ character, onClick, isSelected }: CharacterCardProps) => {
  return (
    <div
      className={`
        bg-gray-800 
        shadow-lg 
        rounded-lg 
        p-6 
        cursor-pointer 
        transition-transform 
        transform 
        hover:scale-105 
        hover:shadow-2xl 
        hover:bg-gray-700
        duration-300 
        min-h-28 
        max-w-xs
        overflow-hidden
        ${isSelected ? "bg-gray-700" : ""}
      `}
      onClick={onClick}
    >
      <h2 className="text-2xl font-bold text-white mb-2 truncate">{character.name}</h2>

      <div className="text-gray-400 italic mb-4">
        <div>{character.type || "Tipo Desconhecido"}</div>
      </div>

      <div className="text-sm text-gray-300">
        <span className="font-semibold">Recompensa: </span>
        {character.reward || "N/A"}
      </div>

      <div className="text-sm text-gray-300 mt-2">
        <span className="font-semibold">Meta: </span>
        {character.goal || "N/A"}
      </div>

      <div className="text-sm text-gray-300 mt-2">
        <span className="font-semibold">Jogador: </span>
        {character.playerName || "Desconhecido"}
      </div>
    </div>
  );
};

export default CharacterCard;
