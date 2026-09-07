import { io } from "socket.io-client";

const accessToken = localStorage.getItem("accessToken");

export const socket = io("http://localhost:3000", {
  auth: {
    token: accessToken,
  },
});
