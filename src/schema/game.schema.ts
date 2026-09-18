import { z } from "zod";

export const modeSchema = z.object({
  mode: z.enum(["SINGLE", "MULTIPLAYER"], "Please select a mode"),
});

export const gameVisibility = z.object({
  visibility: z.enum(
    ["PUBLIC", "PRIVATE"],
    "Please select a game visibility mode"
  ),
});

export type GameMode = z.infer<typeof modeSchema>;
export type GameVisibility = z.infer<typeof gameVisibility>;

export type CreateGameForm = GameMode & GameVisibility;
