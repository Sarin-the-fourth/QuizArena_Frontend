import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_API_URL, {
  auth: {
    token: localStorage.getItem("accessToken"),
  },
  transports: ["websocket"],
});

export const authenticateSocket = (token: string) => {
  socket.disconnect();
  socket.auth = { ...socket.auth, token };
  socket.connect();
};

export const disconnectSocket = () => {
  socket.disconnect();
};
