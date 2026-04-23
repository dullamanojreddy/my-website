import axios from "axios";

export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 12000
});

export const getProfile = () => api.get("/profile");
export const getSkills = () => api.get("/skills");
export const getProjects = () => api.get("/projects");
export const getQualifications = () => api.get("/qualifications");
export const getCertifications = () => api.get("/certifications");
export const submitContact = (payload) => api.post("/contact", payload);

export default api;
