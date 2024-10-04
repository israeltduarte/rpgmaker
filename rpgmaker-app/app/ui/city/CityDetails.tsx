import { ITCity } from "@/app/lib/definitions";
import { AnimatePresence, motion } from "framer-motion";
import CityDetailsButtons from "./CityDetailsButtons";
import FormField from "./FormField";
import FormTextarea from "./FormTextArea";

interface CityDetailsProps {
  selectedCity: ITCity | null;
  isEditing: boolean;
  handleClose: () => void;
  handleEdit: () => void;
  handleFieldChange: (field: keyof ITCity, value: any) => void;
  handleUpdate: () => void;
  handleDeleteConfirmation: (response: boolean) => void;
  handleUndo: () => void;
}

const CityDetails: React.FC<CityDetailsProps> = ({
  selectedCity,
  isEditing,
  handleClose,
  handleEdit,
  handleFieldChange,
  handleUpdate,
  handleDeleteConfirmation,
  handleUndo
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

          <div className={`${isEditing ? "text-gray-800" : "text-gray-200"}`}>
            <h2 className="text-3xl font-semibold mb-2">
              {isEditing ? (
                <FormField
                  label="Nome"
                  name="name"
                  value={selectedCity.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                />
              ) : (
                selectedCity.name
              )}
            </h2>

            {isEditing ? (
              <FormTextarea
                label="Títulos"
                name="titles"
                value={selectedCity.titles.join(",")}
                onChange={(e) => handleFieldChange("titles", e.target.value)}
              />
            ) : (
              selectedCity.curiosities.join(", ")
            )}

            {isEditing ? (
              <FormField
                label="Líder"
                name="leader"
                value={selectedCity.leader}
                onChange={(e) => handleFieldChange("leader", e.target.value)}
              />
            ) : (
              selectedCity.leader
            )}

            {isEditing ? (
              <FormField
                label="Tamanho"
                name="size"
                value={selectedCity.size}
                onChange={(e) => handleFieldChange("size", e.target.value)}
              />
            ) : (
              selectedCity.size
            )}

            {isEditing ? (
              <FormTextarea
                label="Curiosidades"
                name="curiosities"
                value={selectedCity.curiosities.join(", ")}
                onChange={(e) => handleFieldChange("curiosities", e.target.value)}
              />
            ) : (
              selectedCity.curiosities.join(", ")
            )}

            {isEditing ? (
              <FormTextarea
                label="Locais"
                name="places"
                value={selectedCity.places.join(", ")}
                onChange={(e) => handleFieldChange("places", e.target.value)}
              />
            ) : (
              selectedCity.places.join(", ")
            )}

            {isEditing ? (
              <FormTextarea
                label="Pessoas"
                name="people"
                value={selectedCity.people.join(", ")}
                onChange={(e) => handleFieldChange("people", e.target.value)}
              />
            ) : (
              selectedCity.people.join(", ")
            )}

            {isEditing ? (
              <FormTextarea
                label="Grupos"
                name="groups"
                value={selectedCity.groups.join(", ")}
                onChange={(e) => handleFieldChange("groups", e.target.value)}
              />
            ) : (
              selectedCity.groups.join(", ")
            )}

            {isEditing ? (
              <FormTextarea
                label="Notas"
                name="notes"
                value={selectedCity.notes.join(", ")}
                onChange={(e) => handleFieldChange("notes", e.target.value)}
              />
            ) : (
              selectedCity.notes.join(", ")
            )}
          </div>

        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CityDetails;
