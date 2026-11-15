import { useRoomState } from "@colyseus/react"
import { Room } from "@colyseus/sdk"
import { ButtonGamePhase, ButtonGameRoomState } from "@shared"
import { useEffect, useRef, useState } from "react"
import { Button } from "./button.component"
import { Indicator, IndicatorColors } from "./indicator.component"
import "./this-player.component.css"

export function ThisPlayer({ room }: { room: Room | undefined }) {
  const roomState = useRoomState<ButtonGameRoomState>(room)
  const [indicator1Color, setIndicator1Color] = useState(IndicatorColors.BLACK)
  const [indicator2Color, setIndicator2Color] = useState(IndicatorColors.BLACK)
  const [indicator3Color, setIndicator3Color] = useState(IndicatorColors.BLACK)

  const [yourTime, setMyTime] = useState(0)

  const [playingState, setPlayingStateState] = useState(PlayingState.WAITING_FOR_START)
  const playingStateRef = useRef(PlayingState.WAITING_FOR_START)
  const setPlayingState = (playingState: PlayingState) => {
    setPlayingStateState(playingState)
    playingStateRef.current = playingState
  }
  const startTime = useRef(new Date())

  const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))
  const play = async () => {
    startTime.current = new Date()
    setPlayingState(PlayingState.WAITING_FOR_GREEN)
    setIndicator1Color(IndicatorColors.YELLOW)
    await sleep(1000)

    console.log(playingState)
    if (playingStateRef.current != PlayingState.WAITING_FOR_GREEN) return
    setIndicator2Color(IndicatorColors.YELLOW)
    await sleep(1000)

    if (playingStateRef.current != PlayingState.WAITING_FOR_GREEN) return
    setIndicator3Color(IndicatorColors.YELLOW)
    await sleep(roomState?.delay || 1000)

    if (playingStateRef.current != PlayingState.WAITING_FOR_GREEN) return
    setPlayingState(PlayingState.WAITING_FOR_PLAYER)
    setIndicator1Color(IndicatorColors.GREEN)
    setIndicator2Color(IndicatorColors.GREEN)
    setIndicator3Color(IndicatorColors.GREEN)
  }

  const onPressed = (isPressed: boolean) => {
    console.log(isPressed)
    if (isPressed) return

    switch (playingState) {
      case PlayingState.WAITING_FOR_GREEN:
        setPlayingState(PlayingState.TOO_EARLY)
        return
      case PlayingState.WAITING_FOR_PLAYER:
        setPlayingState(PlayingState.SUCCESS)
        const myTime =
          new Date().getTime()
          - startTime.current.getTime()
          - 2000
          - (roomState?.delay || 1000)
        setMyTime(myTime)
        room?.send("my-time", myTime)
        return
    }
  }

  useEffect(() => {
    if (roomState?.phase == ButtonGamePhase.PLAYING) play()
  }, [roomState?.phase]
  )

  const commandText = (playingState: PlayingState) => {
    switch (playingState) {
      case PlayingState.WAITING_FOR_START:
        return "Press and HOLD your button to start"
      case PlayingState.WAITING_FOR_GREEN:
        return "HOLD"
      case PlayingState.WAITING_FOR_PLAYER:
        return "LET GO!!!!"
      case PlayingState.SUCCESS:
        return "WELL DONE"
      case PlayingState.TOO_EARLY:
        return "TOO EARLY"
      default: ""
    }
  }

  return (
    <div className="app-this-player">
      <div>
        {commandText(playingState)}
      </div>
      <div>
        {Math.round(yourTime).toString()} ms
      </div>
      <div className="indicator-row">
        <Indicator color={indicator1Color} />
        <Indicator color={indicator2Color} />
        <Indicator color={indicator3Color} />
      </div>
      <Button room={room} label="Your Button" onPressed={onPressed} />
    </div>
  )
}

enum PlayingState {
  "WAITING_FOR_START",
  "WAITING_FOR_GREEN",
  "WAITING_FOR_PLAYER",
  "SUCCESS",
  "TOO_EARLY"
}
