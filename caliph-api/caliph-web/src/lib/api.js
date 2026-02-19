import axios from "axios";

export const api = axios.create({
  baseURL: "",            // IMPORTANT: same origin (localhost:5173)
  withCredentials: true,  // keep this true
  headers: { Accept: "application/json" },
});

export async function getCsrf() {
  await api.get("/sanctum/csrf-cookie");
}