import { useCharacterContext } from "@/app/context/CharacterContext";
import { AnimatePresence, motion } from "framer-motion";
import CharacterDetailsButtons from "./CharacterDetailsButtons";

const CharacterDetailsView = () => {
  const {
    isEditingCharacter,
    selectedCharacter,
  } = useCharacterContext();

  if (!selectedCharacter) return null;

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
          <CharacterDetailsButtons />

          <div className={`${isEditingCharacter ? "text-gray-800" : "text-gray-200"}`}>
            <h2 className="text-3xl font-semibold mb-2">{selectedCharacter.name}</h2>
            <div className="text-gray-200">
              <p><strong>Tipo:</strong> {selectedCharacter.type}</p>
              <p><strong>Recompensa:</strong> {selectedCharacter.reward}</p>
              <p><strong>Meta:</strong> {selectedCharacter.goal}</p>
              <p><strong>Jogador:</strong> {selectedCharacter.playerName}</p>
              <p><strong>Notas:</strong> {selectedCharacter.notes.join(", ")}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CharacterDetailsView;
