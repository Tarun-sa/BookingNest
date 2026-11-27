import React, { createContext, useContext } from "react";
import { toast } from "sonner";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContextType = {
  showToast: (toastMessage: ToastMessage) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const showToast = (toastMessage: ToastMessage) => {
    if (toastMessage.type === "SUCCESS") {
      toast.success(toastMessage.message);
    } else {
      toast.error(toastMessage.message);
    }
  };
  return (
    <AppContext.Provider value={{ showToast }}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
};
