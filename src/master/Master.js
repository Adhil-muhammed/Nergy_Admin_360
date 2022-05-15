import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Dashboard } from ".";
import { RecoilRoot } from "recoil";

export function Master() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route exact element={<Login />} path={"/"} />
          <Route exact element={<Dashboard />} path={"/admin/*"} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}
