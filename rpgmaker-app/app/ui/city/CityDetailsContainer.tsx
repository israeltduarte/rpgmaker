import { useCityContext } from "@/app/context/CityContext";
import { useEffect } from "react";
import CityDetailsUpdate from "./CityDetailsUpdate";
import CityDetailsView from "./CityDetailsView";

const CityDetailsContainer = () => {
  const {
    isEditingCity,
    setSelectedCity,
    setSearchTerm,
  } = useCityContext();

  useEffect(() => {
    setSelectedCity(null);
    setSearchTerm("");
  }, [setSelectedCity, setSearchTerm]);

  return (
    isEditingCity ? <CityDetailsUpdate /> : <CityDetailsView />
  );
};

export default CityDetailsContainer;
