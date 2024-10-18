import { useCityContext } from "@/app/context/CityContext";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import CityDetailsButtons from "./CityDetailsButtons";
import FormField from "./CityFormField";
import FormTextarea from "./CityFormTextArea";

const CityDetailsUpdate = () => {
  const {
    selectedCity,
    handleFieldChange,
    setSelectedCity,
    isEditingCity,
  } = useCityContext();

  if (!selectedCity) {
    return null;
  }

  useEffect(() => {
    return () => {
      if (!isEditingCity) {
        setSelectedCity(null);
      }
    };
  }, [setSelectedCity, isEditingCity]);

  return (
    <div className="mb-6">
      <AnimatePresence>
        <motion.div
          className="relative bg-gray-700 shadow-lg rounded-lg p-6 mt-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <CityDetailsButtons />

          <div className="text-gray-800">
            <h2 className="text-3xl font-semibold mb-2">
              <FormField
                label="Nome"
                name="name"
                value={selectedCity.name}
                onChange={(e) => handleFieldChange("name", e.target.value)}
              />
            </h2>

            <FormTextarea
              label="Títulos"
              name="titles"
              value={selectedCity.titles.join(", ")}
              onChange={(e) => handleFieldChange("titles", e.target.value)}
            />

            <FormField
              label="Líder"
              name="leader"
              value={selectedCity.leader}
              onChange={(e) => handleFieldChange("leader", e.target.value)}
            />

            <FormField
              label="Tamanho"
              name="size"
              value={selectedCity.size}
              onChange={(e) => handleFieldChange("size", e.target.value)}
            />

            <FormTextarea
              label="Curiosidades"
              name="curiosities"
              value={selectedCity.curiosities.join(", ")}
              onChange={(e) => handleFieldChange("curiosities", e.target.value)}
            />

            <FormTextarea
              label="Locais"
              name="places"
              value={selectedCity.places.join(", ")}
              onChange={(e) => handleFieldChange("places", e.target.value)}
            />

            <FormTextarea
              label="Pessoas"
              name="people"
              value={selectedCity.people.join(", ")}
              onChange={(e) => handleFieldChange("people", e.target.value)}
            />

            <FormTextarea
              label="Grupos"
              name="groups"
              value={selectedCity.groups.join(", ")}
              onChange={(e) => handleFieldChange("groups", e.target.value)}
            />

            <FormTextarea
              label="Notas"
              name="notes"
              value={selectedCity.notes.join(", ")}
              onChange={(e) => handleFieldChange("notes", e.target.value)}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CityDetailsUpdate;
