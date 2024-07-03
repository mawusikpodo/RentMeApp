import { useMutation } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";
import ManageAppartmentForm from "../forms/ManageAppartmentForm/ManageAppartmentForm";

const AddAppartment = () => {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addMyAppartment, {
    onSuccess: () => {
      showToast({ message: "Appartment Saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error Saving Appartment", type: "ERROR" });
    },
  });

  const handleSave = (appartmentFormData: FormData) => {
    mutate(appartmentFormData);
  };

  return <ManageAppartmentForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddAppartment;
