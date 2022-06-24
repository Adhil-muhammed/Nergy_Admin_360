import { SettingsList, useSettings } from ".";
import { Routes, Route } from "react-router-dom";

import React from "react";

export const Settings = () => {
  const { settingsQuery } = useSettings();

  const { data, isLoading } = settingsQuery;
  return (
    <>
      {isLoading || !data ? (
        <div>Loading...</div>
      ) : (
        <Routes>
          <Route path="/" element={<SettingsList settings={settingsQuery} />} />
        </Routes>
      )}
    </>
  );
};
