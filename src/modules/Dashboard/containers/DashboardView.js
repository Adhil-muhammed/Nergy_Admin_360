import React from "react";
import { DashboardLayout } from "shared/components";
import { StatsCard } from "..";

export const DashboardView = (props) => {
  const {
    data: { totalCertificates, totalCourses, totalInstitutes, totalStudents },
  } = props;
  return (
    <DashboardLayout title={"Dashboard"}>
      <div className="row">
        <StatsCard
          iconClass={"bi bi-award"}
          iconbg={"#9694ff"}
          label={"Total Certificates"}
          value={totalCertificates}
        />
        <StatsCard
          iconClass={"bi bi-book"}
          iconbg={"#57caeb"}
          label={"Total Courses"}
          value={totalCourses}
        />
        <StatsCard
          iconClass={"bi bi-house-door"}
          iconbg={"#5ddab4"}
          label={"Total Institutes"}
          value={totalInstitutes}
        />
        <StatsCard
          iconClass={"bi bi-people"}
          iconbg={"#ff7976"}
          label={"Total Students"}
          value={totalStudents}
        />
      </div>
    </DashboardLayout>
  );
};
