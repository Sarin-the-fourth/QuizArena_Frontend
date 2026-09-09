import { create } from "zustand";

interface GameSessionState {
  roomCode: string | null;
  setRoomCode: (roomCode: string) => void;
  clearRoomCode: () => void;
}

export const useGameSessionStore = create<GameSessionState>((set) => ({
  roomCode: null,

  setRoomCode: (roomCode) => set({ roomCode }),

  clearRoomCode: () => set({ roomCode: null }),
}));
