import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_SERVER_API_URL;

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true, // if you're using cookies for auth
});

export default api;
