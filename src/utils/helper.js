import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export const getToken = () => {
  let token = "";
  var localData = JSON.parse(localStorage.getItem("localData"));
  token = localData?.token;
  return token;
};

export const successMessage = async (text) => {
  if (text === null || text === undefined || text === "") text = "Data saved successfully!";
  Toastify({
    text: text,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    backgroundColor: "#4fbe87",
  }).showToast();
};

export const successDeletedMessage = async (text) => {
  successMessage("Data deleted successfully!");
};

export const infoMessage = async (text) => {
  if (text === undefined || text === "") return;
  Toastify({
    text: text,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    backgroundColor: "#4fbe87",
    selector: "toastMessage",
  }).showToast();
};

export const errorMessage = async (text) => {
  if (text === null || text === undefined || text === "") text = "Error";
  Toastify({
    text: text,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    backgroundColor: "#f93e3e",
  }).showToast();
};
