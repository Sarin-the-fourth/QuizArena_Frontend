export interface Game {
  _id: string;
  quizId: {
    _id: string;
    title: string;
    category: string;
  };
  hostId: {
    _id: string;
    name: string;
  };
  roomCode: string;
  players: string[];
  status: string;
}

export interface GetGameResponse {
  games: Game[];
}
