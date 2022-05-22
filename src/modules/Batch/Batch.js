import { BatchList, useBatch, CreateBatch } from ".";
import { Routes, Route } from "react-router-dom";

import React from "react";

export const Batch = () => {
  const { batch, setBatch, createBatch, batchesQuery } = useBatch();
  const { data, isLoading } = batchesQuery;

  return (
    <Routes>
      <Route
        path="/"
        element={isLoading || !data ? <div>Loading</div> : <BatchList batches={data} />}
      />
      <Route
        path="/create"
        element={<CreateBatch batch={batch} setBatch={setBatch} createBatch={createBatch} />}
      />
    </Routes>
  );
};
