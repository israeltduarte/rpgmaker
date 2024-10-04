import { ITCity } from "@/app/lib/definitions";
import { AnimatePresence, motion } from "framer-motion";
import CityDetailsButtons from "./CityDetailsButtons";
import FormField from "./FormField"; // Importe os campos de formulário necessários
import FormTextarea from "./FormTextArea";


interface CityDetailsUpdateProps {
  selectedCity: ITCity | null;
  isEditing: boolean;
  handleFieldChange: (field: keyof ITCity, value: any) => void;
  handleEdit: () => void;
  handleUpdate: () => void;
  handleClose: () => void;
  handleDeleteConfirmation: (response: boolean) => void;
  handleUndo: () => void;
}

const CityDetailsUpdate: React.FC<CityDetailsUpdateProps> = ({
  selectedCity,
  isEditing,
  handleFieldChange,
  handleEdit,
  handleUpdate,
  handleDeleteConfirmation,
  handleClose,
  handleUndo,
}) => {
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
          <CityDetailsButtons
            isEditing={isEditing}
            handleEdit={handleEdit}
            handleClose={handleClose}
            handleUpdate={handleUpdate}
            handleDeleteConfirmation={handleDeleteConfirmation}
            handleUndo={handleUndo}
          />

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
              value={selectedCity.titles.join(",")}
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
    </div >
  );
};

export default CityDetailsUpdate;
