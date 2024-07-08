import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import ManageAppartmentForm from "../forms/ManageAppartmentForm/ManageAppartmentForm";

const EditHotel = () => {
  const { hotelId: appartmentId } = useParams();
  const { showToast } = useAppContext();

  const { data: appartment } = useQuery(
    "fetchMyHotelById",
    () => apiClient.fetchMyAppartmentById(appartmentId || ""),
    {
      enabled: !!appartmentId,
    }
  );

  const { mutate, isLoading } = useMutation(apiClient.updateMyAppartmentById, {
    onSuccess: () => {
      showToast({ message: "Hotel Saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error Saving Hotel", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <ManageAppartmentForm
      appartment={appartment}
      onSave={handleSave}
      isLoading={isLoading}
    />
  );
};

export default EditHotel;
