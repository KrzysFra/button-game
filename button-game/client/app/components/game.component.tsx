import { Room } from "@colyseus/sdk"
import { ButtonGamePlayer, ButtonGameRoomState } from "@shared"
import { useContext, useEffect, useState } from "react"
import { InfoDisplayContext } from "../page"
import "./game.component.css"
import { OtherPlayers } from "./other-players.component"
import { ThisPlayer } from "./this-player.component"

export function ButtonGame({ room, state }: { room: Room | undefined, state: ButtonGameRoomState }) {
  const context = useContext(InfoDisplayContext)

  useEffect(() => {
    context?.setIDContext?.(JSON.stringify(state, null, 2))
  }, [state])

  const [otherPlayers, setOtherPlayers] = useState<Map<string, ButtonGamePlayer>>(new Map())

  useEffect(() => {
    if (state.players) {
      const newOtherPlayers = new Map()
      Object.entries(state?.players).forEach(([k, v]) => {
        if (k != room?.sessionId) newOtherPlayers.set(k, v)
      })

      setOtherPlayers(newOtherPlayers)
    }
  }, [state.players])


  return (
    <div className="app-button-game">
      <div className="title">The BUTTON-Game</div>
      <div className="this-player">
        <ThisPlayer room={room} />
      </div>
      <div className="other-players">
        <OtherPlayers otherPlayers={otherPlayers} />
      </div>
    </div>
  )
}