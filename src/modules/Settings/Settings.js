import { SettingsList } from ".";
import { Routes, Route } from "react-router-dom";

import React from "react";

export const Settings = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SettingsList />} />
      </Routes>
    </>
  );
};
