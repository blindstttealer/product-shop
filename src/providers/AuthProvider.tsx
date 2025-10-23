import React, { useState } from "react";
import { AuthStore } from "../features/auth/model/authStore";

interface AuthStoreProviderProps {
  children: React.ReactNode;
}

export const AuthStoreContext = React.createContext<AuthStore | null>(null);

export const AuthStoreProvider: React.FC<AuthStoreProviderProps> = ({
  children,
}) => {
  const [authStore] = useState(() => new AuthStore());

  return (
    <AuthStoreContext.Provider value={authStore}>
      {children}
    </AuthStoreContext.Provider>
  );
};

export const useAuthStore = () => {
  const store = React.useContext(AuthStoreContext);
  if (!store) {
    throw new Error("useAuthStore must be used within AuthStoreProvider");
  }
  return store;
};
