import { Routes, Route } from "react-router-dom";
import { Footer, SideBar, Header } from "..";
import { Batch, Role, Student, Institute } from "modules";

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
          <Route element={<Student />} path={"/student/*"} />
          <Route element={<Institute />} path={"/institute/*"} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}
