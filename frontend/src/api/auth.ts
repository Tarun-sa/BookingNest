import axios from "axios";
import type { RegisterFromData } from "../pages/Register";
import api from "./axios";
import type { SignInType } from "../pages/SignIn";

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

export const loginApi = async (formData: SignInType) => {
  try {
    const response = await api.post("/api/auth/login", formData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || error.message);
    }
    throw error;
  }
};

export const validateToken = async () => {
  try {
    const response = await api.get("/api/auth/validate-token");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Token Invalid");
    }
    throw error;
  }
};
