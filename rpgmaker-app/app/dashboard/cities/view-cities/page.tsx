"use client";

import { useCityContext } from "@/app/context/CityContext";
import CityDetailsContainer from "@/app/ui/city/CityDetailsContainer";
import CityList from "@/app/ui/city/CityList";
import CitySelector from "@/app/ui/city/CitySelector";
import ClipLoader from "react-spinners/ClipLoader";

export default function ViewCitiesPage() {
  const {
    loading,
  } = useCityContext();

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Cidades</h1>

      {loading ? (
        <div className="flex justify-center">
          <ClipLoader color={"#4A5568"} size={50} />
        </div>
      ) : (
        <div>
          <CitySelector />
          <CityDetailsContainer />
          <CityList />
        </div>
      )}
    </div>
  );
}
