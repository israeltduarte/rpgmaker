import { useCityContext } from "@/app/context/CityContext";
import CityCard from "@/app/ui/city/CityCard";
import React from "react";

const CityList: React.FC = () => {
  const {
    cities,
    handleCardClick,
    selectedCity,
  } = useCityContext();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cities.map((city) => (
        <CityCard
          key={city.id}
          city={city}
          onClick={() => handleCardClick(city)}
          isSelected={selectedCity?.id === city.id}
        />
      ))}
    </div>
  );
};

export default CityList;
