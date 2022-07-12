import { useQuery } from "react-query";
import { getStats } from "..";

const GET_STATS_API = "GET_STATS_API";

export const useDashboard = () => {
  const statsQuery = useQuery(GET_STATS_API, getStats, { staleTime: Infinity });

  return {
    statsQuery,
  };
};
