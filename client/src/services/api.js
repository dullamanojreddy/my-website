import axios from "axios";

/**
 * Base URL for the backend API.
 * In production, this should be set via REACT_APP_API_URL in the hosting environment.
 */
export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 12000
});

export const getProfile = () => api.get("/portfolio/profile");
export const getSkills = () => api.get("/portfolio/skills");
export const getProjects = () => api.get("/portfolio/projects");
export const getCertifications = () => api.get("/portfolio/certifications");
export const submitContact = (payload) => api.post("/contact", payload);

export default api;