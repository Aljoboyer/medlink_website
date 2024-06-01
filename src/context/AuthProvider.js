import React, { createContext } from "react";
import useUserState from "../hooks/useUserState";

// Context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const allContext = useUserState();
  return (
    <AuthContext.Provider value={allContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
