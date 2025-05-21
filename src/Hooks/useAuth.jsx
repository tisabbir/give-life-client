import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import React from 'react';

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;