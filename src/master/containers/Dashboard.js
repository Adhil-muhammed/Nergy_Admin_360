import { Routes, Route } from "react-router-dom";
import { Footer, SideBar, Header } from "..";
import {
  Batch,
  Role,
  Student,
  Institute,
  QuestionBanks,
  Courses,
  Users,
  DashboardCanvas,
  Settings,
  Questions,
  Certificates,
  Notifications,
  SupportTicket,
  Program,
  TrainingPartner,
} from "modules";
import AssessmentSection from "modules/AssessmentSection/AssessmentSection";
import Assessment from "modules/Assessment/Assessment";
import Report from "modules/Reports/Report";
import AssessmentSchedule from "modules/AssessmentSchedule/AssessmentSchedule";

export function Dashboard() {
  return (
    <div id="app">
      <SideBar />
      <div id="main" className="layout-navbar">
        <Header />
        <div id="main-content">
          <Routes>
            <Route element={<DashboardCanvas />} path={"/"} />
            <Route element={<Batch />} path={"/batch/*"} />
            <Route element={<Role />} path={"/role/*"} />
            <Route element={<Student />} path={"/student/*"} />
            <Route element={<Institute />} path={"/institute/*"} />
            <Route element={<QuestionBanks />} path={"/questionbanks/*"} />
            <Route element={<Courses />} path={"/courses/*"} />
            <Route element={<Users />} path={"/users/*"} />
            <Route element={<Settings />} path={"/settings/*"} />
            <Route element={<Questions />} path={"/questions/*"} />
            <Route element={<AssessmentSection />} path={"/assessmentSection/*"} />
            <Route element={<Assessment />} path={"/assessments/*"} />
            <Route element={<Report />} path={"/reports/*"} />
            <Route element={<AssessmentSchedule />} path={"/assessment-schedule/*"} />
            <Route element={<Certificates />} path={"/certificates/*"} />
            <Route element={<Notifications />} path={"/notifications/*"} />
            <Route element={<SupportTicket />} path={"/supportTicket/*"} />
            <Route element={<Program />} path={"/program/*"} />
            <Route element={<TrainingPartner />} path={"/trainingpartner/*"} />

            <Route path="/*" element={<h5>Not Found</h5>} />
          </Routes>
          <Footer />
        </div>
      </div>
    </div>
  );
}
