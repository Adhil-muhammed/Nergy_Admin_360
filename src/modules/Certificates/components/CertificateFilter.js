import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

export const CertificateFilter = () => {
  const history = useNavigate();
  const location = useLocation();
  const gotoCreate = () => {
    history(`${location.pathname}/create`);
  };
  return (
    <div>
      <div className="mb-4">
        <Button color="primary" size="sm" onClick={gotoCreate}>
          Create New
        </Button>
      </div>
    </div>
  );
};
