import { BatchList, useBatch } from ".";
import { Routes, Route } from "react-router-dom";

export const Batch = () => {
  const { batch, setBatch, batchesQuery } = useBatch();
  const { data, isLoading } = batchesQuery;
  return (
    <Routes>
      <Route
        path="/"
        element={isLoading || !data ? <div>Loading</div> : <BatchList batches={data} />}
      />
      <Route path="/create" element={<BatchList />} />
    </Routes>
  );
};
