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
  Trainer,
  TrainingPartner,
} from "modules";
import AssessmentSection from "modules/AssessmentSection/AssessmentSection";
import Assessment from "modules/Assessment/Assessment";
import Report from "modules/Reports/Report";
import AssessmentSchedule from "modules/AssessmentSchedule/AssessmentSchedule";
import { useAuthorizeContext } from "master";


export function Dashboard() {
  const { hasPermission } = useAuthorizeContext();
  return (
    <div id="app">
      <SideBar />
      <div id="main" className="layout-navbar">
        <Header />
        <div id="main-content">
          <Routes>
            <Route element={<DashboardCanvas />} path={"/"} />
            {
              hasPermission("Batches", "View") &&
              <Route element={<Batch hasPermission={hasPermission} />} path={"/batch/*"} />
            }
            {
              hasPermission("UserRoles", "View") && <Route element={<Role />} path={"/role/*"} />
            }
            {
              hasPermission("Students", "View") &&
              <Route element={<Student hasPermission={hasPermission} />} path={"/student/*"} />
            }
            {
              hasPermission("Institutes", "View") && <Route element={<Institute />} path={"/institute/*"} />
            }
            {
              hasPermission("QuestionBanks", "View") && <Route element={<QuestionBanks />} path={"/questionbanks/*"} />
            }
            {
              hasPermission("Users", "View") && <Route element={<Users />} path={"/users/*"} />
            }
            {
              hasPermission("Courses", "View") && <Route element={<Courses />} path={"/courses/*"} />
            }
            {
              hasPermission("Settings", "View") && <Route element={<Settings />} path={"/settings/*"} />
            }
            {
              hasPermission("Questions", "View") && <Route element={<Questions />} path={"/questions/*"} />
            }
            {
              hasPermission("AssessmentSections", "View") && <Route element={<AssessmentSection />} path={"/assessmentsection/*"} />

            }
            {
              hasPermission("Assessments", "View") && <Route element={<Assessment />} path={"/assessments/*"} />
            }
            {
              hasPermission("Courses", "View") && <Route element={<Report />} path={"/reports/*"} />
            }
            {
              hasPermission("AssessmentSchedule", "View") && <Route element={<AssessmentSchedule />} path={"/assessment-schedule/*"} />
            }
            {
              hasPermission("Certificates", "View") && <Route element={<Certificates />} path={"/certificates/*"} />
            }
            {
              hasPermission("Notifications", "View") && <Route element={<Notifications />} path={"/notifications/*"} />
            }
            {
              hasPermission("SupportTickets", "View") && <Route element={<SupportTicket />} path={"/supportticket/*"} />
            }
            {
              hasPermission("Program", "View") && <Route element={<Program />} path={"/program/*"} />
            }
            {
              hasPermission("Trainer", "View") && <Route element={<Trainer />} path={"/trainer/*"} />
            }
            {
              hasPermission("TrainingPartner", "View") && <Route element={<TrainingPartner />} path={"/trainingpartner/*"} />
            }
            <Route path="/*" element={<h5>Not Found</h5>} />
          </Routes>
          <Footer />
        </div>
      </div>
    </div>
  );
}
