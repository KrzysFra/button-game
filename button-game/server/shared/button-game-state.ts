import { schema, t, type SchemaType } from "@colyseus/schema"

export enum phase {
  WAITING_FOR_START,
  PLAYING,
  ELIMINATING
}

export const ButtonGamePlayer = schema({
  name: t.string().default("no name"),
  isEliminated: t.boolean().default(false),
  hasPressed: t.boolean().default(false),
  isReady: t.boolean().default(false)
})
export type ButtonGamePlayer = SchemaType<typeof ButtonGamePlayer>

export const ButtonGameRoomState = schema({
  phase: t.number().default(phase.WAITING_FOR_START),
  countdown: t.number().default(0),
  players: t.map(ButtonGamePlayer),
})
export type ButtonGameRoomState = SchemaType<typeof ButtonGameRoomState>

