import { schema, t, type SchemaType } from "@colyseus/schema"

export enum ButtonGamePhase {
  WAITING_FOR_START = "WAITING_FOR_START",
  PLAYING = "PLAYING",
  CONCLUSION_CALCULATION = "CONCLUSION_CALCULATION",
  CONCLUSION_RESULT = "CONCLUSION_RESULT",
  WAITING_FOR_RESET = "WAITING_FOR_RESET",
  GAME_END = "GAME_END",
}

export const ButtonGamePlayer = schema({
  name: t.string().default(""),
  isEliminated: t.boolean().default(false),
  isPressed: t.boolean().default(false),
  isHover: t.boolean().default(false),
  isCPU: t.boolean().default(false),
  myTime: t.number().optional()
})
export type ButtonGamePlayer = SchemaType<typeof ButtonGamePlayer>

export const ButtonGameRoomState = schema({
  phase: t.string().default(ButtonGamePhase.WAITING_FOR_START),
  delay: t.number().default(0),
  players: t.map(ButtonGamePlayer),
  amountCPUs: t.number().default(0),
})
export type ButtonGameRoomState = SchemaType<typeof ButtonGameRoomState>

