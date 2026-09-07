export interface Game {
  _id: string;
  quizId: string;
  hostId: string;
  roomCode: string;
  gameMode: string;
  players: string[];
  status: string;
}

export interface QuizSummary {
  _id: string;
  title: string;
  category: string;
}

export interface Player {
  _id: string;
  name: string;
}

export interface PopulatedGame
  extends Omit<Game, "quizId" | "hostId" | "players"> {
  quizId: QuizSummary;
  hostId: Player;
  players: Player[];
}

export interface GetGameResponse {
  games: PopulatedGame[];
}

export interface PopulatedOneGame
  extends Omit<Game, "quizId" | "hostId" | "players"> {
  quizId: QuizSummary;
  hostId: Player;
  players: Player[];
}

export interface GetOneGameResponse {
  game: PopulatedOneGame;
}

export interface CreateGameDTO {
  quizId: string;
  gameMode: string;
}

export interface CreateGameResponse {
  message: string;
  game: Game;
}

export interface JoinRoomDTO {
  roomCode: string;
}

export interface JoinRoomResponse {
  message: string;
  game: Game;
}

export interface LeaveRoomResponse {
  message: string;
}
