import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAppStore } from "store/AppStore";

export const ProtectedRoute = ({ children, redirectTo }) => {
  const { AppState } = useAppStore();
  return AppState.token ? children : <Navigate to="/" />;
};