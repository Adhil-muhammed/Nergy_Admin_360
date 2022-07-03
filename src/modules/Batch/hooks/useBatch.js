import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import { getBatches, createBatches, updateBatches, deteleBatches, getBatchById } from "..";
import { useNavigate } from "react-router-dom";
import { successMessage, successDeletedMessage, errorMessage } from "utils";

const GET_BATCHES = "GET_BATCHES";
const GET_BATCH_BY_ID = "BATCH_BY_ID";

export const useBatch = ({ load = false, batchId = 0 }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const batchesQuery = useQuery(GET_BATCHES, getBatches, {
    refetchOnWindowFocus: false,
    enabled: load,
    staleTime: Infinity,
  });
  const batchInfo = useQuery(`${GET_BATCH_BY_ID}_${batchId}`, () => getBatchById(batchId), {
    refetchOnWindowFocus: false,
    enabled: batchId > 0,
  });

  useEffect(() => {
    if (batchInfo.data) {
      setBatch(batchInfo.data);
    }
  }, [batchInfo.data]);

  const [isConfirmDelete, setIsConfirmDelete] = useImmer(false);
  const [batch, setBatch] = useImmer({
    batchId: 0,
    name: "",
    startDate: "",
    endDate: "",
    status: 0,
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setBatch((draft) => {
      draft[name] = value;
    });
  };

  const createBatch = useMutation(createBatches, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to create!");
    },
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_BATCHES);
      navigate("..", { replace: true });
    },
  });

  const editBatch = useMutation(updateBatches, {
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_BATCHES);
      navigate("..", { replace: true });
    },
    onError: (e, newData, previousData) => {
      errorMessage("Unable to edit!");
    },
  });

  const deleteBatch = useMutation(deteleBatches, {
    onSuccess: () => {
      successDeletedMessage();
      queryClient.invalidateQueries(GET_BATCHES);
    },
    onError: (e, newData, previousData) => {
      errorMessage("Unable to delete!");
    },
    onSettled: () => {
      onToggleModal(false);
    },
  });

  const onDelete = (id) => {
    const selectedBatch = batchesQuery.data.find((c) => c.batchId === id);
    if (selectedBatch) setBatch(selectedBatch);

    setIsConfirmDelete((draft) => {
      draft = true;
      return draft;
    });
  };

  const onToggleModal = React.useCallback(
    (isOpen) => {
      setIsConfirmDelete((draft) => {
        draft = isOpen;
        return draft;
      });
    },
    [setIsConfirmDelete]
  );

  return {
    batch,
    setBatch,
    batchesQuery,
    batchInfo,
    createBatch,
    editBatch,
    onDelete,
    onChange,
    isConfirmDelete,
    onToggleModal,
    deleteBatch,
  };
};
