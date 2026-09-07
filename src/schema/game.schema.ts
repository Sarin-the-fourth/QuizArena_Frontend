import { z } from "zod";

export const modeSchema = z.object({
  mode: z.enum(["SINGLE", "MULTIPLAYER"], "Please select a mode"),
});

export type GameMode = z.infer<typeof modeSchema>;
