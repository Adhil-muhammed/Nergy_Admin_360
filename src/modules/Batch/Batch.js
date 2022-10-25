import { BatchList, useBatch, AddOrEditBatch } from ".";
import { Routes, Route } from "react-router-dom";
import { useAppStore } from "master";


import React from "react";

export const Batch = (props) => {
  const { hasPermission } = props;
  return (
    <>
      <Routes>
        <Route path="/" element={<BatchList hasPermission={hasPermission} />} />
        {
          hasPermission("Batches", "Create") && <Route path="/create" element={<AddOrEditBatch />} />
        }
        {
          hasPermission("Batches", "Edit") && <Route path="/edit/:batchId" element={<AddOrEditBatch />} />
        }
        <Route path="/*" element={<h5>Not Found</h5>} />
      </Routes>
    </>
  );
};
