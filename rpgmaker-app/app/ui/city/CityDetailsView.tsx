import { useCityContext } from "@/app/context/CityContext";
import { AnimatePresence, motion } from "framer-motion";
import CityDetailsButtons from "./CityDetailsButtons";

const CityDetailsView = () => {
  const {
    isEditingCity,
    selectedCity
  } = useCityContext();

  if (!selectedCity) return null;

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

          <div className={`${isEditingCity ? "text-gray-800" : "text-gray-200"}`}>
            <h2 className="text-3xl font-semibold mb-2">{selectedCity.name}</h2>
            <div className="text-gray-200">
              <p><strong>Líder:</strong> {selectedCity.leader}</p>
              <p><strong>Tamanho:</strong> {selectedCity.size}</p>
              <p><strong>Curiosidades:</strong> {selectedCity.curiosities.join(", ")}</p>
              <p><strong>Locais:</strong> {selectedCity.places.join(", ")}</p>
              <p><strong>Pessoas:</strong> {selectedCity.people.join(", ")}</p>
              <p><strong>Grupos:</strong> {selectedCity.groups.join(", ")}</p>
              <p><strong>Notas:</strong> {selectedCity.notes.join(", ")}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CityDetailsView;
