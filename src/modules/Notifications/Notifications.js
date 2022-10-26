import React from "react";
import { NotificationList, AddOrEditNotification } from ".";
import { Routes, Route } from "react-router-dom";
import { useAuthorizeContext } from "master";

export const Notifications = () => {
  const { hasPermission } = useAuthorizeContext();

  return (
    <>
      <Routes>
        {
          hasPermission("Notifications", "View") &&
          <Route path="/" element={<NotificationList />} />
        }
        {
          hasPermission("Notifications", "Create") &&
          <Route path="/create" element={<AddOrEditNotification />} />
        }
        {
          hasPermission("Notifications", "Edit") &&
          <Route path="/edit/:notificationId" element={<AddOrEditNotification />} />

        }
      </Routes>
    </>
  );
};
