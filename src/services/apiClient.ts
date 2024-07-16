import axios from "axios";
import { cookiesStore } from "./cookiesStore";
import { COOKIES } from "@taskfy/constants/cookies.constant";

function setupApiClient() {
  const token = cookiesStore.get(COOKIES.TOKEN);

  const client = axios.create({
    baseURL: "http://localhost:8080",
  });

  if (token) {
    client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return client;
}

export const apiClient = setupApiClient();
