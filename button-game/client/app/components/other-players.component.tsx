import { ButtonGamePlayer } from "@shared"
import "./other-players.component.css"

export function OtherPlayers({ otherPlayers }: { otherPlayers: Map<string, ButtonGamePlayer> }) {

  return (
    <div className="app-other-players">
      {otherPlayers?.values().map(p => (<div>{p.name}</div>))}
    </div>
  )
}