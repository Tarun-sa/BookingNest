import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext } from "react";
import * as ApiClient from "../api/auth";

type AppContextType = {
  isLoggedIn: boolean;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  let isLoggedIn = false;

  const { isSuccess } = useQuery({
    queryKey: ["ValidateToken"],
    queryFn: ApiClient.validateToken,
    retry: 0,
  });
  isLoggedIn = isSuccess;

  return (
    <AppContext.Provider value={{ isLoggedIn }}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
};
