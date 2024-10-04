import { ITCity } from "@/app/lib/definitions";
import CityCard from "@/app/ui/city/CityCard";
import React from "react";

interface CityListProps {
  cities: ITCity[];
  onCityClick: (city: ITCity) => void;
  selectedCityId: string | undefined;
}

const CityList: React.FC<CityListProps> = ({
  cities,
  onCityClick,
  selectedCityId,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cities.map((city) => (
        <CityCard
          key={city.id}
          city={city}
          onClick={() => onCityClick(city)}
          isSelected={selectedCityId === city.id}
        />
      ))}
    </div>
  );
};

export default CityList;
