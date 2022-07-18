import React from "react";
import { Spinner } from "reactstrap";

export const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
      <Spinner color="secondary">Loading...</Spinner>
    </div>
  );
};
