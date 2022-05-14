import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Dashboard } from ".";

export function Master() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact element={<Login />} path={"/"} />
        <Route exact element={<Dashboard />} path={"/admin/*"} />
      </Routes>
    </BrowserRouter>
  );
}
