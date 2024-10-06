import { useCityContext } from "@/app/context/CityContext";
import { FaCheck, FaUndo } from "react-icons/fa";
import { IoClose, IoPencil } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

const CityDetailsButtons = () => {
  const {
    isEditingCity,
    handleEdit,
    handleCloseCityDetails,
    handleUpdate,
    handleUndoCityUpdate,
    handleDeleteCity
  } = useCityContext();
  return (
    <div className="absolute top-2 right-2 flex gap-2">
      {!isEditingCity ? (
        <>
          <button
            className="text-gray-600 bg-blue-200 hover:bg-blue-400 rounded-full p-2 transition-colors duration-200"
            onClick={handleEdit}
          >
            <IoPencil size={20} />
          </button>
          <button
            className="text-gray-600 bg-red-200 hover:bg-red-400 rounded-full p-2 transition-colors duration-200"
            onClick={() => handleDeleteCity()}
          >
            <MdDelete size={20} />
          </button>
          <button
            className="text-gray-600 bg-white hover:bg-white rounded-full p-2 transition-colors duration-200"
            onClick={handleCloseCityDetails}
          >
            <IoClose size={20} />
          </button>
        </>
      ) : (
        <>
          <button
            className="text-gray-600 bg-yellow-100 hover:bg-yellow-200 rounded-full p-2 transition-colors duration-200"
            onClick={handleUndoCityUpdate}
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
