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
    <Routes>
      <Route
        path="/"
        element={
          isLoading || !data ? (
            <div>Loading</div>
          ) : (
            <BatchList
              batch={batch}
              isConfirmDelete={isConfirmDelete}
              deleteBatch={deleteBatch}
              batches={data}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleModal={onToggleModal}
            />
          )
        }
      />
      <Route
        path="/create"
        element={<CreateBatch batch={batch} setBatch={setBatch} createBatch={createBatch} />}
      />
      <Route
        path="/edit"
        element={<EditBatch batch={batch} setBatch={setBatch} editBatch={editBatch} />}
      />
    </Routes>
  );
};
