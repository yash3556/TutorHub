import axios from "axios";
import { API_BASE_URL } from "./api";

const API_URL = `${API_BASE_URL}/student`;

export const getAvailableTeachers = async (filters = {}) => {
  const params = new URLSearchParams();
  ["subject", "teachingMode", "search", "page", "limit"].forEach((key) => {
    if (filters[key] !== undefined && filters[key] !== "") params.append(key, filters[key]);
  });
  const { data } = await axios.get(`${API_URL}/teachers?${params.toString()}`, { withCredentials: true });
  return data;
};

export const getTeacherDetails = async (id) => {
  const { data } = await axios.get(`${API_URL}/teachers/${id}`, { withCredentials: true });
  return data;
};

export const getStudentRequests = async () => {
  const { data } = await axios.get(`${API_URL}/requests`, { withCredentials: true });
  return data;
};

export const getStudentProfile = async () => {
  const { data } = await axios.get(`${API_URL}/profile`, { withCredentials: true });
  return data;
};

export const updateStudentInfo = async (profileData) => {
  const { data } = await axios.put(`${API_URL}/profile/info`, profileData, { withCredentials: true });
  return data;
};

export const updateStudentAvatar = async (avatarData) => {
  const { data } = await axios.post(`${API_URL}/profile/avatar`, { avatarData }, { withCredentials: true });
  return data;
};

export const updateStudentPassword = async (passwordData) => {
  const { data } = await axios.put(`${API_URL}/profile/password`, passwordData, { withCredentials: true });
  return data;
};

export const deleteStudentAccount = async () => {
  const { data } = await axios.delete(`${API_URL}/profile`, { withCredentials: true });
  return data;
};