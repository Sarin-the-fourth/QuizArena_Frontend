import { axiosInstance } from "@/api/axios";
import type {
  CreateGameDTO,
  CreateGameResponse,
  GetGameResponse,
  GetOneGameResponse,
  JoinRoomDTO,
  JoinRoomResponse,
  LeaveRoomResponse,
} from "@/types/game.type";
import type { AxiosResponse } from "axios";

export const getGame = (): Promise<AxiosResponse<GetGameResponse>> => {
  return axiosInstance.get("/game");
};

export const getOneGame = (
  roomCode: string
): Promise<AxiosResponse<GetOneGameResponse>> => {
  return axiosInstance.get(`/game/${roomCode}`);
};

export const createGame = (
  data: CreateGameDTO
): Promise<AxiosResponse<CreateGameResponse>> => {
  return axiosInstance.post("/game", data);
};

export const joinGame = (
  data: JoinRoomDTO
): Promise<AxiosResponse<JoinRoomResponse>> => {
  return axiosInstance.post("/game/join", data);
};

export const leaveGame = (
  roomCode: string
): Promise<AxiosResponse<LeaveRoomResponse>> => {
  return axiosInstance.patch(`/game/${roomCode}/leave`);
};

export const startGame = (roomCode: string) => {
  return axiosInstance.patch(`/game/${roomCode}/start`);
};
