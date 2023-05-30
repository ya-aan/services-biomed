import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_BASE_URL;

export const baseClient = axios.create({
  baseURL: apiBaseUrl,
});
