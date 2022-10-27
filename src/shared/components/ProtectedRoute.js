import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAppScopeContext } from "master";

export const ProtectedRoute = ({ children, redirectTo }) => {
  const { AppState } = useAppScopeContext();
  return AppState.token ? children : <Navigate to="/auth/login" />;
};
