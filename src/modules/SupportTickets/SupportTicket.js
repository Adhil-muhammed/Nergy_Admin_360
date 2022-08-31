import { SupportTicketList, AddOrEditSupportTicket } from ".";
import { Routes, Route } from "react-router-dom";

import React from "react";

export const SupportTicket = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SupportTicketList />} />
        <Route path="/create" element={<AddOrEditSupportTicket />} />
        <Route path="/edit/:ticketId" element={<AddOrEditSupportTicket />} />
      </Routes>
    </>
  );
};
