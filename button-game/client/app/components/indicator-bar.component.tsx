import { useEffect, useState } from "react"
import "./indicator-bar.component.css"
import { Indicator } from "./indicator.component"
import { PlayingState } from "./this-player.component"

export enum IndicatorColors {
  BLACK = "BLACK",
  RED = "RED",
  YELLOW = "YELLOW",
  BLUE = "BLUE",
  GREEN = "GREEN",
}

export function IndicatorBar({ playingState }: { playingState: PlayingState }) {
  const [indicator1Color, setIndicator1Color] = useState(IndicatorColors.BLACK)
  const [indicator2Color, setIndicator2Color] = useState(IndicatorColors.BLACK)
  const [indicator3Color, setIndicator3Color] = useState(IndicatorColors.BLACK)

  useEffect(() => {
    switch (playingState) {
      case PlayingState.WAITING_FOR_START:
        setIndicator1Color(IndicatorColors.BLACK)
        setIndicator2Color(IndicatorColors.BLACK)
        setIndicator3Color(IndicatorColors.BLACK)
        return
      case PlayingState.COUNTDOWN_3:
        setIndicator1Color(IndicatorColors.YELLOW)
        setIndicator2Color(IndicatorColors.BLACK)
        setIndicator3Color(IndicatorColors.BLACK)
        return
      case PlayingState.COUNTDOWN_2:
        setIndicator1Color(IndicatorColors.YELLOW)
        setIndicator2Color(IndicatorColors.YELLOW)
        setIndicator3Color(IndicatorColors.BLACK)
        return
      case PlayingState.COUNTDOWN_1:
        setIndicator1Color(IndicatorColors.YELLOW)
        setIndicator2Color(IndicatorColors.YELLOW)
        setIndicator3Color(IndicatorColors.YELLOW)
        return
      case PlayingState.WAITING_FOR_PLAYER:
      case PlayingState.CONCLUSION_CALCULATION:
      case PlayingState.CONCLUSION_RESULT:
      case PlayingState.GAME_END:
        setIndicator1Color(IndicatorColors.GREEN)
        setIndicator2Color(IndicatorColors.GREEN)
        setIndicator3Color(IndicatorColors.GREEN)
        return
    }
  },
    [playingState]
  )

  return <div className="app-indicator-bar">
    <Indicator color={indicator1Color} />
    <Indicator color={indicator2Color} />
    <Indicator color={indicator3Color} />
  </div>
}