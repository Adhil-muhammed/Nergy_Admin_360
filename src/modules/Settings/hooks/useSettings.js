import React from "react";
import { useQuery } from "react-query";
import { getSettings } from "..";

const GET_SETTINGS_API = "GET_SETTINGS_API";

export const useSettings = () => {
  const settingsQuery = useQuery(GET_SETTINGS_API, getSettings, { staleTime: Infinity });

  return {
    settingsQuery,
  };
};
