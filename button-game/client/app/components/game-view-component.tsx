import { Room } from "@colyseus/sdk"

export function GameView({ room, state }: { room: Room | undefined, state: {} }) {
  return (
    <div>
      <div>GameView</div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  )
}