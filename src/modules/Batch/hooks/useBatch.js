import { useQuery, useMutation, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import { getBatches, createBatches } from "..";

const GetBatchKey = "GET_BATCHES_API";

export const useBatch = () => {
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

  return { batch, setBatch, batchesQuery, createBatch };
};
