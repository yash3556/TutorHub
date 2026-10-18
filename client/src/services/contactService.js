import axios from "axios";
import { API_BASE_URL } from "./api";

const API_URL = `${API_BASE_URL}/contact`;

export const sendContactMessage = async (message) => {
  const { data } = await axios.post(API_URL, message, { withCredentials: true });
  return data;
};
