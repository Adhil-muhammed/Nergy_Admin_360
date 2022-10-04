import React from "react";
import { useQuery } from "react-query";
import { getSettings, createSettings, updateSettings, getSettingsById } from "..";

const GET_SETTINGS_API = "GET_SETTINGS_API";

export const useSettings = ({ load = false }) => {
  const settingsQuery = useQuery(GET_SETTINGS_API, getSettings, {
    refetchOnWindowFocus: false,
    enabled: load,
    staleTime: Infinity,
  });

  return {
    settingsQuery,
  };
};
