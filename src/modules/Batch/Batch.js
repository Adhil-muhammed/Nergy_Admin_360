import { BatchList, useBatch, AddOrEditBatch } from ".";
import { Routes, Route } from "react-router-dom";

import React from "react";

export const Batch = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<BatchList />} />
        <Route path="/create" element={<AddOrEditBatch />} />
        <Route path="/edit/:batchId" element={<AddOrEditBatch />} />
      </Routes>
    </>
  );
};
