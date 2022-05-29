import { BatchList, useBatch, CreateBatch, EditBatch } from ".";
import { Routes, Route } from "react-router-dom";

import React from "react";

export const Batch = () => {
  const {
    batch,
    setBatch,
    createBatch,
    batchesQuery,
    editBatch,
    deleteBatch,
    isConfirmDelete,
    onEdit,
    onDelete,
    onToggleModal,
  } = useBatch();

  const { data, isLoading } = batchesQuery;
  return (
    <>
      {isLoading || !data ? (
        <div>Loading</div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <BatchList
                batch={batch}
                isConfirmDelete={isConfirmDelete}
                deleteBatch={deleteBatch}
                batches={data}
                onDelete={onDelete}
                onToggleModal={onToggleModal}
              />
            }
          />
          <Route
            path="/create"
            element={<CreateBatch batch={batch} setBatch={setBatch} createBatch={createBatch} />}
          />
          <Route
            path="/edit/:batchId"
            element={
              <EditBatch batch={batch} setBatch={setBatch} editBatch={editBatch} onEdit={onEdit} />
            }
          />
        </Routes>
      )}
    </>
  );
};
