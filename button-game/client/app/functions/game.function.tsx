import { useRoom, useRoomState } from "@colyseus/react"
import { Client } from "@colyseus/sdk"
import { ButtonGameRoomState } from "@shared"
import { ButtonGame } from "../components/game.component"

const client = new Client("ws://localhost:2567")

export function Game() {
  const { room, error, isConnecting } = useRoom<ButtonGameRoomState>(
    () => client.joinOrCreate("my_room"),
  )
  const state = useRoomState(room) as any


  if (isConnecting) return <p>Connecting...</p>
  if (error) return <p>Error: {error.message}</p>

  return <ButtonGame room={room} state={state} />
}