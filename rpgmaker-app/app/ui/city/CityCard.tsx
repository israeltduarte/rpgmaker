import { CityCardProps } from "@/app/lib/definitions";

const CityCard = ({ city, onClick, isSelected }: CityCardProps) => {
  return (
    <div
      className={`
        bg-gray-800 
        shadow-lg 
        rounded-lg 
        p-4 
        cursor-pointer 
        transition-transform 
        transform 
        hover:scale-105 
        hover:shadow-xl 
        hover:bg-gray-700
        duration-200 
        min-h-28
        ${isSelected ? "bg-gray-700" : ""}
      `}
      onClick={onClick}
    >
      <h2 className="text-2xl font-semibold mb-2">{city.name}</h2>
      <p className="text-gray-500 italic">{city.titles}</p>
    </div>
  );
}

export default CityCard;


