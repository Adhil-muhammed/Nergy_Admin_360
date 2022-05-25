import { useQuery, useMutation, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import { getBatches, createBatches, updateBatches, deteleBatches } from "..";
import { useNavigate, useLocation } from "react-router-dom";

const GetBatchKey = "GET_BATCHES_API";

export const useBatch = () => {
  const history = useNavigate();
  const location = useLocation();
  const [isConfirmDelete, setIsConfirmDelete] = useImmer(false);
  const [batch, setBatch] = useImmer({
    batchId: 0,
    name: "",
    startDate: "",
    endDate: "",
    status: 0,
  });

  const queryClient = useQueryClient();
  const batchesQuery = useQuery(GetBatchKey, getBatches, { staleTime: Infinity });

  const createBatch = useMutation(createBatches, {
    onMutate: async (update) => {
      await queryClient.cancelQueries(GetBatchKey);
      const data = queryClient.getQueryData(GetBatchKey);
      queryClient.setQueryData(GetBatchKey, (prevData) => {
        let updatedData = [...prevData, update];
        return updatedData;
      });
      return data;
    },
    onError: (e, newData, previousData) => {
      queryClient.setQueryData(GetBatchKey, previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  const editBatch = useMutation(updateBatches, {
    onMutate: async (update) => {
      await queryClient.cancelQueries(GetBatchKey);
      const data = queryClient.getQueryData(GetBatchKey);
      queryClient.setQueryData(GetBatchKey, (prevData) => {
        let updatedData = prevData.map((p) => {
          let newData = { ...p };
          if (p.batchId === update.batchId) {
            newData.name = update.name;
            newData.startDate = update.startDate;
            newData.endDate = update.endDate;
          }
          return newData;
        });
        return updatedData;
      });
      return data;
    },
    onError: (e, newData, previousData) => {
      queryClient.setQueryData(GetBatchKey, previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  const deleteBatch = useMutation(deteleBatches, {
    onMutate: async (batchId) => {
      await queryClient.cancelQueries(GetBatchKey);
      const data = queryClient.getQueryData(GetBatchKey);
      queryClient.setQueryData(GetBatchKey, (prevData) => {
        let updatedData = [...prevData.filter((n) => n.batchId !== batchId)];
        return updatedData;
      });
      return data;
    },
    onError: (e, newData, previousData) => {
      queryClient.setQueryData(GetBatchKey, previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
      onToggleModal(false);
    },
  });

  const getSelectedBatch = (id) => {
    const selectedBatch = batchesQuery.data.filter((s) => s.batchId === id)[0];
    setBatch((draft) => {
      draft.batchId = selectedBatch.batchId;
      draft.endDate = selectedBatch.endDate;
      draft.startDate = selectedBatch.startDate;
      draft.name = selectedBatch.name;
      draft.status = selectedBatch.status;
      return draft;
    });
  };

  const onEdit = (id) => {
    const selectedBatch = batchesQuery.data.filter((s) => s.batchId === id)[0];
    setBatch((draft) => {
      draft.batchId = selectedBatch.batchId;
      draft.endDate = selectedBatch.endDate;
      draft.startDate = selectedBatch.startDate;
      draft.name = selectedBatch.name;
      draft.status = selectedBatch.status;
      return draft;
    });
    history(`${location.pathname}/edit`);
  };

  const onDelete = (id) => {
    getSelectedBatch(id);
    setIsConfirmDelete((draft) => {
      draft = true;
      return draft;
    });
  };

  const onToggleModal = (isOpen) => {
    setIsConfirmDelete((draft) => {
      draft = isOpen;
      return draft;
    });
  };

  return {
    batch,
    setBatch,
    batchesQuery,
    createBatch,
    editBatch,
    onEdit,
    onDelete,
    isConfirmDelete,
    onToggleModal,
    deleteBatch,
  };
};
