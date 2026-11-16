import { ButtonGamePhase } from "@shared"
import "./time-display.component.css"

export function TimeDisplay({ buttonGamePhase, time }: { buttonGamePhase?: ButtonGamePhase, time?: number }) {

  return (
    <div className="app-time-display">
      {displayElement(buttonGamePhase, time)}
    </div>
  )
}

function displayElement(playingState?: ButtonGamePhase, time?: number) {
  switch (playingState) {
    case ButtonGamePhase.CONCLUSION_CALCULATION:
      const animationDelay = Math.random()
      const animationDuration = 1.75 - animationDelay

      return <div className="calculating">
        <div
          className="calculating-line"
          style={{
            animationDelay: animationDelay + "s",
            animationDuration: animationDuration + "s"
          }}
        ></div>
      </div>
    case ButtonGamePhase.CONCLUSION_RESULT:
      return <div>
        {Math.round(time || 0).toString()} ms
      </div>
    default:
      return ""
  }
}
