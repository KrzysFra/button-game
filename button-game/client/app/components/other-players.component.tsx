import { ButtonGamePlayer } from "@shared"
import "./other-players.component.css"

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
    </div>
  )
}