import axios from "axios";
import type { RegisterFromData } from "../pages/Register";
import api from "./axios";

export const registerApi = async (formData: RegisterFromData) => {
  try {
    const response = await api.post("/api/users/register", formData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw error;
  }
};
