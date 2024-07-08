import { BookingFormData } from "./forms/BookingForm/BookingForm";
import { SignInFormData } from "./pages/Login";
import { RegisterFormData } from "./pages/Register";
import { AppartmentSearchResponse, AppartmentType, UserType } from "./shared/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  return response.json();
};

export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
    const responseBody = await response.json();
  
    if (!response.ok) {
      throw new Error(responseBody.message);
    }
  };

  export const signIn = async (formData: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
    const body = await response.json();
    if (!response.ok) {
      throw new Error(body.message);
    }
    return body;
  };

  export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Token invalid");
    }
  
    return response.json();
  };

  export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      credentials: "include",
      method: "POST",
    });
  
    if (!response.ok) {
      throw new Error("Error during sign out");
    }
  };
  
  export const addMyAppartment = async (appartmentFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-appartments`, {
      method: "POST",
      credentials: "include",
      body: appartmentFormData,
    });
  
    if (!response.ok) {
      throw new Error("Failed to add appartment");
    }
  
    return response.json();
  };

  export const fetchMyAppartments = async (): Promise<AppartmentType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-appartments`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Error fetching appartments");
    }
  
    return response.json();
  };
  
  export const fetchMyAppartmentById = async (appartmentId: string): Promise<AppartmentType> => {
    const response = await fetch(`${API_BASE_URL}/api/my-appartments/${appartmentId}`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Error fetching Appartments");
    }
  
    return response.json();
  };
  
  export const updateMyAppartmentById = async (appartmentFormData: FormData) => {
    const response = await fetch(
      `${API_BASE_URL}/api/my-appartments/${appartmentFormData.get("appartmentId")}`,
      {
        method: "PUT",
        body: appartmentFormData,
        credentials: "include",
      }
    );
  
    if (!response.ok) {
      throw new Error("Failed to update Appartment");
    }
  
    return response.json();
  };
  
  export type SearchParams = {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    adultCount?: string;
    childCount?: string;
    page?: string;
    facilities?: string[];
    types?: string[];
    stars?: string[];
    maxPrice?: string;
    sortOption?: string;
  };
  
  export const searchAppartments = async (
    searchParams: SearchParams
  ): Promise<AppartmentSearchResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append("destination", searchParams.destination || "");
    queryParams.append("checkIn", searchParams.checkIn || "");
    queryParams.append("checkOut", searchParams.checkOut || "");
    queryParams.append("adultCount", searchParams.adultCount || "");
    queryParams.append("childCount", searchParams.childCount || "");
    queryParams.append("page", searchParams.page || "");
  
    queryParams.append("maxPrice", searchParams.maxPrice || "");
    queryParams.append("sortOption", searchParams.sortOption || "");
  
    searchParams.facilities?.forEach((facility) =>
      queryParams.append("facilities", facility)
    );
  
    searchParams.types?.forEach((type) => queryParams.append("types", type));
    searchParams.stars?.forEach((star) => queryParams.append("stars", star));
  
    const response = await fetch(
      `${API_BASE_URL}/api/appartments/search?${queryParams}`
    );
  
    if (!response.ok) {
      throw new Error("Error fetching appartments");
    }
  
    return response.json();
  };
  
  export const fetchAppartments = async (): Promise<AppartmentType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/appartments`);
    if (!response.ok) {
      throw new Error("Error fetching appartments");
    }
    return response.json();
  };
  
  export const fetchAppartmentById = async (appartmentId: string): Promise<AppartmentType> => {
    const response = await fetch(`${API_BASE_URL}/api/appartments/${appartmentId}`);
    if (!response.ok) {
      throw new Error("Error fetching Appartments");
    }
  
    return response.json();
  };
  
  // export const createPaymentIntent = async (
  //   hotelId: string,
  //   numberOfNights: string
  // ): Promise<PaymentIntentResponse> => {
  //   const response = await fetch(
  //     `${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
  //     {
  //       credentials: "include",
  //       method: "POST",
  //       body: JSON.stringify({ numberOfNights }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  
  //   if (!response.ok) {
  //     throw new Error("Error fetching payment intent");
  //   }
  
  //   return response.json();
  // };
  
  export const createRoomBooking = async (formData: BookingFormData) => {
    const response = await fetch(
      `${API_BASE_URL}/api/appartments/${formData.appartmentId}/bookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      }
    );
  
    if (!response.ok) {
      throw new Error("Error booking room");
    }
  };
  
  export const fetchMyBookings = async (): Promise<AppartmentType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Unable to fetch bookings");
    }
  
    return response.json();
  };
  