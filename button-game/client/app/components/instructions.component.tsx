import { useEffect, useState } from "react"
import "./instructions.component.css"
import { PlayingState } from "./this-player.component"

export function Instructions({ playingState, isTimeSent, isEliminated }: { playingState: PlayingState, isTimeSent: boolean, isEliminated: boolean }) {
  const [classes, setClasses] = useState(`app-instructions ${playingState}`)
  const [text, setText] = useState("no instruction")

  useEffect(() => {
    setText(getText(playingState, isTimeSent, isEliminated))
    setClasses(`app-instructions ${playingState}`)
  }, [playingState, isTimeSent, isEliminated])

  return (<div className={classes}>
    {text || <span>&nbsp;</span>}
  </div>)
}

function getText(playingState: PlayingState, isTimeSent: boolean, isEliminated: boolean) {
  if (isEliminated) return "You are out"
  switch (playingState) {
    case PlayingState.WAITING_FOR_START:
      return "Press and HOLD your button to start"
    case PlayingState.COUNTDOWN_1:
    case PlayingState.COUNTDOWN_2:
    case PlayingState.COUNTDOWN_3:
      if (isTimeSent) return "Waiting for Others"
      return "HOLD"
    case PlayingState.WAITING_FOR_PLAYER:
      if (isTimeSent) return "Waiting for Others"
      return "LET GO!!!!"
    case PlayingState.GAME_END:
      return "YOU WON"
    default:
      return ""
  }
}
