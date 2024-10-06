import { useCityContext } from "@/app/context/CityContext";
import CityDetailsUpdate from "./CityDetailsUpdate";
import CityDetailsView from "./CityDetailsView";

const CityDetailsContainer = () => {
  const { isEditingCity } = useCityContext();

  return (
    isEditingCity ? <CityDetailsUpdate /> : <CityDetailsView />
  );
};

export default CityDetailsContainer;
