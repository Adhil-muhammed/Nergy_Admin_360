import { SettingsList } from ".";
import { Routes, Route } from "react-router-dom";
import { useAuthorizeContext } from "master";

import React from "react";

export const Settings = () => {
  const { hasPermission } = useAuthorizeContext();

  return (
    <>
      <Routes>
        {
          (hasPermission("Settings", "View") || hasPermission("Settings", "Edit")) &&
          <Route path="/" element={<SettingsList />} />
        }
      </Routes>
    </>
  );
};
