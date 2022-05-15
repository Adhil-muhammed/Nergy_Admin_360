import { selector, useRecoilValue } from "recoil";
import { Axios } from "src/utils/config";
import { Batch_List } from ".";

const batchQuery = selector({
  key: Batch_List,
  get: async () => {
    try {
      const res = await Axios.get("/Batches");
      return res.data || [];
    } catch {}
  },
});

export const useBatch = () => {
  const bartches = useRecoilValue(batchQuery);
  return { bartches };
};
