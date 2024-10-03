import { CityCardProps } from "@/app/lib/definitions";

export default function CityCard({ city, onClick, isSelected }: CityCardProps) {

  return (
    <div
      className={`
      bg-gray-100 
      shadow-lg 
      rounded-lg 
      p-4 
      border 
      border-gray-300 
      cursor-pointer 
      transition-transform 
      transform 
      hover:scale-105 
      hover:shadow-xl 
      hover:border-gray-500 
      hover:bg-indigo-200
      duration-200 
      min-h-28
      ${isSelected ? "bg-indigo-200 border-gray-500" : "bg-gray-100 border-gray-300"}
      `}
      onClick={onClick}
    >
      <h2 className="text-2xl font-semibold text-indigo-700 mb-2">{city.name}</h2>
      <p className="text-gray-500 italic">{city.title}</p>
    </div>
  );
}


