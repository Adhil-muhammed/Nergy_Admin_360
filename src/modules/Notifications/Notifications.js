import React from "react";
import { NotificationList, AddOrEditNotification } from ".";
import { Routes, Route } from "react-router-dom";

export const Notifications = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<NotificationList />} />
        <Route path="/create" element={<AddOrEditNotification />} />
        <Route path="/edit/:notificationId" element={<AddOrEditNotification />} />
      </Routes>
    </>
  );
};
