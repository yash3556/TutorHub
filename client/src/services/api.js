const API_ORIGIN = import.meta.env.PROD
  ? ""
  : (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/+$/, "");

export const API_BASE_URL = `${API_ORIGIN}/api`;
