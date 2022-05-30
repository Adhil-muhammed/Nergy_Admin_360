import { Routes, Route } from "react-router-dom";
import { Footer, SideBar, Header } from "..";
import { Batch } from "modules/Batch";
import { Role } from "modules/Roles";

export function Dashboard() {
  return (
    <div id="app">
      <SideBar />
      <div id="main">
        <Header />
        <Routes>
          <Route element={<div>hi</div>} path={"/"} />
          <Route element={<Batch />} path={"/batch/*"} />
          <Route element={<Role />} path={"/role/*"} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}
