import React from "react";
import { Route, Routes } from "react-router-dom";
import { AddorEditCertificates, CertificateList } from "./containers";
import { useAuthorizeContext } from "master";

export const Certificates = () => {
  const { hasPermission } = useAuthorizeContext();

  return (
    <>
      <Routes>
        {
          hasPermission("Certificates", "View") &&
          <Route path="/" element={<CertificateList />} />
        }
        {
          hasPermission("Certificates", "Create") &&
          <Route path="/create" element={<AddorEditCertificates />} />
        }
        {
          hasPermission("Certificates", "Edit") &&
          <Route path="/edit/:certId" element={<AddorEditCertificates />} />
        }
      </Routes>
    </>
  );
};
