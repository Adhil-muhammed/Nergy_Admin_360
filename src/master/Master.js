import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Dashboard } from ".";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export function Master() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route exact element={<Login />} path={"/"} />
          <Route exact element={<Dashboard />} path={"/admin/*"} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
