import { io } from "socket.io-client";

const accessToken = localStorage.getItem("accessToken");

export const socket = io(import.meta.env.VITE_API_URL, {
  auth: {
    token: accessToken,
  },
});
