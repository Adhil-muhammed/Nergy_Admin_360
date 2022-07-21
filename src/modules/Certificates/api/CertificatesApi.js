import { Axios } from "utils";

export const getCertificates = async () => {
  const res = await Axios.get("/Certificates");
  return res.data;
};

export const createCertificates = async (payload) => {
  const res = await Axios.post("/Certificates/Generate", payload);
  return res.data;
};

export const getCeritificatesById = async (certId) => {
  const res = await Axios.get(`/Certificates/${certId}`);
  return res.data;
};

export const deleteCertificates = async (certId) => {
  const res = await Axios.delete(`/Certificates/${certId}`);
  return res.data;
};
