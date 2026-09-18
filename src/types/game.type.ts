export interface Game {
  _id: string;
  quizId: string;
  hostId: string;
  roomCode: string;
  gameMode: string;
  roomMode: "PUBLIC" | "PRIVATE";
  players: GamePlayer[];
  status: string;
}

export interface GamePlayer {
  userId: string;
  score: number;
}

export interface QuizSummary {
  _id: string;
  title: string;
  roomMode: "PUBLIC" | "PRIVATE";
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
  players: PopulatedGamePlayer[];
}

export interface PopulatedGamePlayer {
  userId: Player;
  score: number;
  timeTaken: number;
}

export interface GetGameResponse {
  games: PopulatedGame[];
}

export interface GetOneGameResponse {
  game: PopulatedGame;
}

export interface CreateGameDTO {
  quizId: string;
  gameMode: string;
  gameVisibility: "PUBLIC" | "PRIVATE";
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
