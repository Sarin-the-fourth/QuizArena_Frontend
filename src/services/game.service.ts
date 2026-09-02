import { axiosInstance } from "@/api/axios";
import type { GetGameResponse } from "@/types/game.type";
import type { AxiosResponse } from "axios";

export const getGame = (): Promise<AxiosResponse<GetGameResponse>> => {
  return axiosInstance.get("/game");
};
