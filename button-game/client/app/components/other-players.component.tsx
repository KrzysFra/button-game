import { ButtonGamePhase, ButtonGamePlayer } from "@shared"
import { Button } from "./button.component"
import "./other-players.component.css"
import { TimeDisplay } from "./time-display.component"

export function OtherPlayers({ otherPlayers, buttonGamePhase }: { otherPlayers: Map<string, ButtonGamePlayer>, buttonGamePhase: ButtonGamePhase }) {

  return (
    <div className="app-other-players">
      <div className="players">
        {Array.from(otherPlayers?.entries().map(
          ([k, v]) => (<OtherPlayer key={k} player={v} buttonGamePhase={buttonGamePhase} />)
        ))}
      </div>
    </div>
  )
}

function OtherPlayer({ player, buttonGamePhase }: { player: ButtonGamePlayer, buttonGamePhase: ButtonGamePhase }) {

  return (
    <div className={"app-other-player"
      + (player.isEliminated ? " eliminated" : ""
        + buttonGamePhase == ButtonGamePhase.GAME_END ? " winner" : ""
      )}>
      <div className={"name"}>{player.name}</div>
      <div className={"time"}>
        <TimeDisplay buttonGamePhase={buttonGamePhase} time={player.myTime} />
      </div>
      <div className="button-container">
        <Button
          isHover={player.isHover}
          isPressed={player.isPressed}
          isDisabled={player.isEliminated}
          height="4em"
          width="4em"
        />
      </div>
    </div>
  )
}