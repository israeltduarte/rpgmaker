import { FaCheck, FaUndo } from "react-icons/fa";
import { IoClose, IoPencil } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

interface CityDetailsButtonsProps {
  isEditing: boolean;
  handleClose: () => void;
  handleEdit: () => void;
  handleUpdate: () => void;
  handleUndo: () => void;
  handleDeleteConfirmation: (response: boolean) => void;
}

const CityDetailsButtons: React.FC<CityDetailsButtonsProps> = ({
  isEditing,
  handleEdit,
  handleClose,
  handleUpdate,
  handleUndo,
  handleDeleteConfirmation
}) => {

  return (
    <div className="absolute top-2 right-2 flex gap-2">
      {!isEditing ? (
        <>
          <button
            className="text-gray-600 bg-blue-200 hover:bg-blue-400 rounded-full p-2 transition-colors duration-200"
            onClick={handleEdit}
          >
            <IoPencil size={20} />
          </button>
          <button
            className="text-gray-600 bg-red-200 hover:bg-red-400 rounded-full p-2 transition-colors duration-200"
            onClick={() => handleDeleteConfirmation(true)}
          >
            <MdDelete size={20} />
          </button>
          <button
            className="text-gray-600 bg-white hover:bg-white rounded-full p-2 transition-colors duration-200"
            onClick={handleClose}
          >
            <IoClose size={20} />
          </button>
        </>
      ) : (
        <>
          <button
            className="text-gray-600 bg-yellow-100 hover:bg-yellow-200 rounded-full p-2 transition-colors duration-200"
            onClick={handleUndo}
          >
            <FaUndo size={20} />
          </button>
          <button
            className="text-gray-600 bg-green-200 hover:bg-green-400 rounded-full p-2 transition-colors duration-200"
            onClick={handleUpdate}
          >
            <FaCheck size={20} />
          </button>
        </>
      )}
    </div>
  );
};

export default CityDetailsButtons;