import { Room } from "@colyseus/sdk"
import { Button } from "./button.component"
import "./this-player.component.css"

export function ThisPlayer({ room }: { room: Room | undefined }) {
  return (
    <div className="app-this-player">
      <div className="indicator-row">
        <div className="indicator"></div>
        <div className="indicator"></div>
        <div className="indicator"></div>
      </div>
      <Button room={room} label="Your Button" />
    </div>
  )
}