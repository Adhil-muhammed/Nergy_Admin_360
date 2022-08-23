import { Axios } from "utils";

export const getNotifications = async () => {
  const res = await Axios.get("/Notifications");
  return res.data;
};

export const getNotificationById = async (notificationId) => {
  const res = await Axios.get(`/Notifications/${notificationId}`);
  return res.data;
};

export const createNotifications = async (notification) => {
  const res = await Axios.post("/Notifications", notification);
  return res.data;
};

export const updateNotifications = async (content) => {
  const res = await Axios.put(`/Notifications/${content.notificationId}`, content);
  return res.data;
};

export const deteleNotifications = async (notificationId) => {
  const res = await Axios.delete(`/Notifications/${notificationId}`);
  return res.data;
};
