import { ButtonGamePlayer } from "@shared"
import "./other-players.component.css"
import { Button } from "./button.component"

export function OtherPlayers({ otherPlayers }: { otherPlayers: Map<string, ButtonGamePlayer> }) {

  return (
    <div className="app-other-players">
      <div className="players">
        {Array.from(otherPlayers?.entries().map(([k, v]) => (<OtherPlayer key={k} player={v} />)))}
      </div>
    </div>
  )
}

function OtherPlayer({ player }: { player: ButtonGamePlayer }) {
  return (
    <div className="app-other-player">
      <div className="name">{player.name}</div>
      <div className="button-container">
        <Button isHover={player.isHover} isPressed={player.isPressed} height="4em" width="4em" />
      </div>
    </div>
  )
}