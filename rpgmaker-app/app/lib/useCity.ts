import { useState } from "react";
import { ITCity } from "@/app/lib/definitions";

export function useCityEditing(initialCity: ITCity) {
  const [selectedCity, setSelectedCity] = useState<ITCity>(initialCity);
  const [isEditing, setIsEditing] = useState(false);

  const handleFieldChange = (field: keyof ITCity, value: string) => {
    setSelectedCity(prevCity => ({
      ...prevCity,
      [field]: value,
    }));
  };

  const toggleEdit = () => {
    setIsEditing(prev => !prev);
  };

  return {
    selectedCity,
    isEditing,
    toggleEdit,
    handleFieldChange,
  };
}