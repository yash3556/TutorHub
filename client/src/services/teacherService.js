import axios from "axios";
import { API_BASE_URL } from "./api";

const API_URL = `${API_BASE_URL}/teacher`;

// Profile APIs
export const getProfileSettings = async () => {
  const { data } = await axios.get(`${API_URL}/profile`, { withCredentials: true });
  return data;
};

export const updateTeacherInfo = async (profileData) => {
  const { data } = await axios.put(`${API_URL}/profile/info`, profileData, {
    withCredentials: true,
  });
  return data;
};

export const updateTeacherAvatar = async (avatarData) => {
  const { data } = await axios.post(`${API_URL}/profile/avatar`, { avatarData }, {
    withCredentials: true,
  });
  return data;
};

export const submitVerification = async (verificationData) => {
  const { data } = await axios.put(`${API_URL}/profile/verification`, verificationData, {
    withCredentials: true,
  });
  return data;
};

export const updatePassword = async (passwordData) => {
  const { data } = await axios.put(`${API_URL}/profile/password`, passwordData, {
    withCredentials: true,
  });
  return data;
};

export const deleteTeacherAccount = async () => {
  const { data } = await axios.delete(`${API_URL}/profile`, { withCredentials: true });
  return data;
};

export const updateAvailability = async (availability) => {
  const { data } = await axios.put(`${API_URL}/profile/availability`, availability, {
    withCredentials: true,
  });
  return data;
};

export const updateBankDetails = async (bankDetails) => {
  const { data } = await axios.put(`${API_URL}/profile/bank-details`, bankDetails, {
    withCredentials: true,
  });
  return data;
};

// Students APIs
export const getAvailableStudents = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.classLevel) params.append("classLevel", filters.classLevel);
  if (filters.subject) params.append("subject", filters.subject);
  if (filters.board) params.append("board", filters.board);
  if (filters.search) params.append("search", filters.search);
  if (filters.page) params.append("page", filters.page);
  if (filters.limit) params.append("limit", filters.limit);
  if (filters.minBudget) params.append("minBudget", filters.minBudget);
  if (filters.maxBudget) params.append("maxBudget", filters.maxBudget);
  if (filters.availability) params.append("availability", filters.availability);
  if (filters.preferredTeachingMode) params.append("preferredTeachingMode", filters.preferredTeachingMode);

  const { data } = await axios.get(`${API_URL}/students?${params.toString()}`, {
    withCredentials: true,
  });
  return data;
};

export const getStudentDetails = async (id) => {
  const { data } = await axios.get(`${API_URL}/students/${id}`, { withCredentials: true });
  return data;
};

// Requests APIs
export const getTeacherRequests = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.status) params.append("status", filters.status);
  if (filters.sort) params.append("sort", filters.sort);

  const { data } = await axios.get(`${API_URL}/requests?${params.toString()}`, {
    withCredentials: true,
  });
  return data;
};

export const getRequestDetails = async (id) => {
  const { data } = await axios.get(`${API_URL}/requests/${id}`, {
    withCredentials: true,
  });
  return data;
};

export const updateRequestStatus = async (id, status, message = "") => {
  const { data } = await axios.put(
    `${API_URL}/requests/${id}`,
    { status, message },
    { withCredentials: true }
  );
  return data;
};

export const getRequestStats = async () => {
  const { data } = await axios.get(`${API_URL}/requests-stats`, {
    withCredentials: true,
  });
  return data;
};

// Reviews APIs
export const getTeacherReviews = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.timeFilter) params.append("timeFilter", filters.timeFilter);

  const { data } = await axios.get(`${API_URL}/reviews?${params.toString()}`, {
    withCredentials: true,
  });
  return data;
};

export const getReviewDetails = async (id) => {
  const { data } = await axios.get(`${API_URL}/reviews/${id}`, {
    withCredentials: true,
  });
  return data;
};

export const getReviewStats = async () => {
  const { data } = await axios.get(`${API_URL}/reviews-stats`, {
    withCredentials: true,
  });
  return data;
};

// Dashboard APIs
export const getDashboardStats = async () => {
  const { data } = await axios.get(`${API_URL}/dashboard-stats`, {
    withCredentials: true,
  });
  return data;
};
