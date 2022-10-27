import React from "react";
import { SupportTicketList, AddOrEditSupportTicket } from ".";
import { Routes, Route } from "react-router-dom";
import { useAuthorizeContext } from "master";

export const SupportTicket = () => {
  const { hasPermission } = useAuthorizeContext();

  return (
    <>
      <Routes>
        {
          hasPermission("SupportTickets", "View") &&
          <Route path="/" element={<SupportTicketList />} />
        }
        {
          hasPermission("SupportTickets", "Create") &&
          <Route path="/create" element={<AddOrEditSupportTicket />} />
        }
        {
          hasPermission("SupportTickets", "Edit") &&
          <Route path="/edit/:ticketId" element={<AddOrEditSupportTicket />} />
        }
      </Routes>
    </>
  );
};
