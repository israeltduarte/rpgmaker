import { ITCity } from "@/app/lib/definitions";
import CityDetailsUpdate from "./CityDetailsUpdate";
import CityDetailsView from "./CityDetailsView";

interface CityDetailsContainerProps {
  selectedCity: ITCity | null;
  isEditing: boolean;
  handleClose: () => void;
  handleEdit: () => void;
  handleFieldChange: (field: keyof ITCity, value: any) => void;
  handleUpdate: () => void;
  handleDeleteConfirmation: (response: boolean) => void;
  handleUndo: () => void;
}

const CityDetailsContainer: React.FC<CityDetailsContainerProps> = ({
  selectedCity,
  isEditing,
  handleClose,
  handleEdit,
  handleFieldChange,
  handleUpdate,
  handleDeleteConfirmation,
  handleUndo,
}) => {

  return isEditing ? (
    <CityDetailsUpdate
      selectedCity={selectedCity}
      isEditing={isEditing}
      handleFieldChange={handleFieldChange}
      handleEdit={handleEdit}
      handleUpdate={handleUpdate}
      handleClose={handleClose}
      handleUndo={handleUndo}
      handleDeleteConfirmation={handleDeleteConfirmation}
    />
  ) : (
    <CityDetailsView
      selectedCity={selectedCity}
      isEditing={isEditing}
      handleClose={handleClose}
      handleEdit={handleEdit}
      handleDeleteConfirmation={handleDeleteConfirmation}
      handleFieldChange={handleFieldChange}
      handleUpdate={handleUpdate}
      handleUndo={handleUndo}
    />
  );
};

export default CityDetailsContainer;
