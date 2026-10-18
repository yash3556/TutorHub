import axios from "axios";

const API_URL = "http://localhost:3000/api/contact";

export const sendContactMessage = async (message) => {
  const { data } = await axios.post(API_URL, message, { withCredentials: true });
  return data;
};
