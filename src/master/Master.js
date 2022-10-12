import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, ForgotPassword, ResetPassword, Dashboard } from ".";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppStore } from "store/AppStore";
import { ProtectedRoute } from "shared/components/ProtectedRoute";

const queryClient = new QueryClient();

export function Master() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppStore>
        <BrowserRouter basename="admin">
          <Routes>
            <Route exact element={<Login />} path={"/auth/login"} />
            <Route exact element={<ForgotPassword />} path={"/forgotPassword"} />
            <Route exact element={<ResetPassword />} path={"/auth/reset"} />
            <Route
              exact
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
              path={"/*"}
            />
          </Routes>
        </BrowserRouter>
      </AppStore>
    </QueryClientProvider>
  );
}
