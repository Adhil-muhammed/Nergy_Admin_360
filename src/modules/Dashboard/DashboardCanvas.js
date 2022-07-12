import { DashboardView, useDashboard } from ".";
import React from "react";

export const DashboardCanvas = () => {
  const {
    statsQuery: { data, isLoading, isError },
  } = useDashboard();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong..!</div>;

  return (
    <>
      <DashboardView data={data} />
    </>
  );
};
