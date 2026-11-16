import { PlayingState } from "./this-player.component"
import "./time-display.component.css"

export function TimeDisplay({ playingState, time }: { playingState: PlayingState, time: number | undefined }) {
  return (<div>
    {Math.round(time || 0).toString()} ms
  </div>)
}
