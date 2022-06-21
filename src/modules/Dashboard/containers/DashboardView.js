import React from "react";
import { DashboardLayout } from "shared/components";
import { StatsCard } from "..";

export const DashboardView = (props) => {
  const {
    stats: { totalCertificates, totalCourses, totalInstitutes, totalStudents },
  } = props;
  return (
    <DashboardLayout title={"Dashboard"}>
      <div className="row">
        <StatsCard icon={"bi bi-award"} iconbg={"#9694ff"} label={"Total Certificates"} value={totalCertificates} />
        <StatsCard icon={"bi bi-book"} iconbg={"#57caeb"} label={"Total Courses"} value={totalCourses} />
        <StatsCard icon={"bi bi-house-door"} iconbg={"#5ddab4"} label={"Total Institutes"} value={totalInstitutes} />
        <StatsCard icon={"bi bi-people"} iconbg={"#ff7976"} label={"Total Students"} value={totalStudents} />
      </div>
    </DashboardLayout>
  );
};
