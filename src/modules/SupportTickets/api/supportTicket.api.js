import { Axios } from "utils";

export const getSupportTickets = async () => {
  const res = await Axios.get("/SupportTickets");
  return res.data;
};

export const getSupportTicketById = async (ticketId) => {
  const res = await Axios.get(`/SupportTickets/${ticketId}`);
  return res.data;
};

export const createSupportTicket = async (ticket) => {
  const res = await Axios.post("/SupportTickets", ticket);
  return res.data;
};

export const updateSupportTicket = async (ticket) => {
  const res = await Axios.put(`/SupportTickets/${ticket.ticketId}`, ticket);
  return res.data;
};

export const deteleSupportTickets = async (ticketId) => {
  const res = await Axios.delete(`/SupportTickets/${ticketId}`);
  return res.data;
};

export const createSupportTicketReply = async (reply) => {
  const res = await Axios.post("/SupportTickets/Reply", reply);
  return res.data;
};

export const deleteTicketsReply = async (id) => {
  const res = await Axios.delete(`/SupportTickets/Reply/${id}`);
  return res.data;
};
