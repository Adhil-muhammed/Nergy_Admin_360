import { useQuery } from "react-query";
import { getStats } from "..";

const GetStatsKey = "GET_STATS_API";

export const useDashboard = () => {
  const statsQuery = useQuery(GetStatsKey, getStats, { staleTime: Infinity });

  return {
    statsQuery
  };
};
