import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from ".";

export function Master() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact element={<Login />} path={"/"} />
      </Routes>
    </BrowserRouter>
  );
}
