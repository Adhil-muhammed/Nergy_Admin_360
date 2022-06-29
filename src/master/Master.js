import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login,
  ForgotPassword,
  ResetPassword,
  Dashboard
} from ".";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export function Master() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route exact element={<Login />} path={"/"} />
          <Route exact element={<ForgotPassword />} path={"/forgotPassword"} />
          <Route exact element={<ResetPassword />} path={"/resetPassword"} />
          <Route exact element={<Dashboard />} path={"/admin/*"} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
