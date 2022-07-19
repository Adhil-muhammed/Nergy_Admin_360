import React from "react";
import { Route, Routes } from "react-router-dom";
import { AddorEditCertificates, CertificateList } from "./containers";

export const Certificates = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<CertificateList />} />
        <Route path="/create" element={<AddorEditCertificates />} />
        <Route path="/edit/:certId" element={<AddorEditCertificates />} />
      </Routes>
    </>
  );
};
