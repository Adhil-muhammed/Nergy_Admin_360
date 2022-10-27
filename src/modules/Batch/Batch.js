import { BatchList, useBatch, AddOrEditBatch } from ".";
import { Routes, Route } from "react-router-dom";
import { useAuthorizeContext } from "master";



import React from "react";

export const Batch = () => {
  const { hasPermission } = useAuthorizeContext();

  return (
    <>
      <Routes>
        <Route path="/" element={<BatchList />} />
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
