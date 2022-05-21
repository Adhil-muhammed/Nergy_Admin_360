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
  const batchesQuery = useQuery(GetBatchKey, getBatches);

  const createBatch = useMutation(createBatches, {
    onMutate: {},
    onSuccess: (data) => {},
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  return { batch, setBatch, batchesQuery, createBatch };
};
