import { CityCardProps } from "@/app/lib/definitions";

const CityCard = ({ city, onClick, isSelected }: CityCardProps) => {
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
      <h2 className="text-2xl font-bold text-white mb-2 truncate">{city.name}</h2>
      
      {/* Exibindo os títulos, um embaixo do outro */}
      <div className="text-gray-400 italic mb-4">
        {city.titles.length > 0 
          ? city.titles.map((title, index) => (
              <div key={index} className="mb-1">{title}</div>
            ))
          : <div>Sem títulos</div>
        }
      </div>

      <div className="text-sm text-gray-300">
        <span className="font-semibold">Líder: </span>
        {city.leader || "Desconhecido"}
      </div>

      <div className="text-sm text-gray-300 mt-2">
        <span className="font-semibold">Tamanho: </span>
        {city.size || "N/A"}
      </div>
    </div>
  );
};

export default CityCard;
