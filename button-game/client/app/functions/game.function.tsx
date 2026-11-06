import { Client } from "@colyseus/sdk"
import { useRoom, useRoomState } from "@colyseus/react"
import { GameView } from "../components/game-view-component"

const client = new Client("ws://localhost:2567")

export function Game() {
  const { room, error, isConnecting } = useRoom(
    () => client.joinOrCreate("my_room"),
  )

  const state = useRoomState(room)
  // room?.onMessage("*", (m, p) => console.log(m, p))

  if (isConnecting) return <p>Connecting...</p>
  if (error) return <p>Error: {error.message}</p>

  return <GameView room={room} state={state} />
}