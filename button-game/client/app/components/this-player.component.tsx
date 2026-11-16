import { useRoomState } from "@colyseus/react"
import { Room } from "@colyseus/sdk"
import { ButtonGamePhase, ButtonGamePlayer, ButtonGameRoomState, sleep } from "@shared"
import { useEffect, useRef, useState } from "react"
import { Button } from "./button.component"
import "./this-player.component.css"
import { IndicatorBar } from "./indicator-bar.component"
import { Instructions } from "./instructions.component"
import { TimeDisplay } from "./time-display.component"

export function ThisPlayer({ room }: { room: Room | undefined }) {
  const roomState = useRoomState<ButtonGameRoomState>(room)

  const [playingState, setPlayingStateState] = useState(PlayingState.WAITING_FOR_START)
  const playingStateRef = useRef(PlayingState.WAITING_FOR_START)
  const setPlayingState = (playingState: PlayingState) => {
    setPlayingStateState(playingState)
    playingStateRef.current = playingState
  }

  const me = useRef<ButtonGamePlayer | undefined>(undefined)
  useEffect(() => {
    if (!room?.sessionId) return
    me.current = roomState?.players?.[room.sessionId] as ButtonGamePlayer
  }, [roomState?.players?.[room?.sessionId || ""]])

  const startTime = useRef(new Date())
  const [myTime, setMyTime] = useState<number | undefined>(undefined)

  const [isTimeSent, setIsTimeSent] = useState(false)

  // set playingstate from roomstate
  useEffect(() => {
    switch (roomState?.phase) {
      case ButtonGamePhase.WAITING_FOR_START:
      case ButtonGamePhase.WAITING_FOR_RESET:
        setPlayingState(PlayingState.WAITING_FOR_START)
        setIsTimeSent(false)
        return
      case ButtonGamePhase.PLAYING:
        startPlayingSequence()
        return
      case ButtonGamePhase.CONCLUSION_CALCULATION:
        setPlayingState(PlayingState.CONCLUSION_CALCULATION)
        return
      case ButtonGamePhase.CONCLUSION_RESULT:
        setPlayingState(PlayingState.CONCLUSION_RESULT)
        return
      case ButtonGamePhase.GAME_END:
        setPlayingState(PlayingState.GAME_END)
        return
    }
  }, [roomState?.phase]
  )

  const startPlayingSequence = async () => {
    startTime.current = new Date()
    setPlayingState(PlayingState.COUNTDOWN_3)
    await sleep(1000)

    if (playingStateRef.current != PlayingState.COUNTDOWN_3) return
    setPlayingState(PlayingState.COUNTDOWN_2)
    await sleep(1000)

    // @ts-ignore
    if (playingStateRef.current != PlayingState.COUNTDOWN_2) return
    setPlayingState(PlayingState.COUNTDOWN_1)
    await sleep(roomState?.delay || 1000)

    //@ts-ignore
    if (playingStateRef.current != PlayingState.COUNTDOWN_1) return
    setPlayingState(PlayingState.WAITING_FOR_PLAYER)
  }

  const onPressed = (isPressed: boolean) => {
    if (isPressed) return
    if (![
      PlayingState.COUNTDOWN_3,
      PlayingState.COUNTDOWN_2,
      PlayingState.COUNTDOWN_1,
      PlayingState.WAITING_FOR_PLAYER,
    ].includes(playingState)) return

    const myTime =
      new Date().getTime()
      - startTime.current.getTime()
      - 2000
      - (roomState?.delay || 1000)
    setMyTime(myTime)
    setIsTimeSent(true)
    room?.send("my-time", myTime)
  }

  // set me
  useEffect(() => {
    if (!room?.sessionId) return
    me.current = roomState?.players?.[room.sessionId] as ButtonGamePlayer
  }, [roomState?.players?.[room?.sessionId || ""]])

  return (
    <div className="app-this-player">
      <div className="text">
        {playingState}
        <br /> {roomState?.phase}
        <br /> {me.current?.isEliminated ? "eliminated" : "playing"}
        <Instructions playingState={playingState} isTimeSent={isTimeSent} />
      </div>
      <div>
        <TimeDisplay playingState={playingState} time={myTime} />
      </div>
      <IndicatorBar playingState={playingState} />
      <Button room={room} label="Your Button" onPressed={onPressed} />
    </div>
  )
}

export enum PlayingState {
  WAITING_FOR_START = "WAITING_FOR_START",
  COUNTDOWN_3 = "COUNTDOWN_3",
  COUNTDOWN_2 = "COUNTDOWN_2",
  COUNTDOWN_1 = "COUNTDOWN_1",
  WAITING_FOR_PLAYER = "WAITING_FOR_PLAYER",
  CONCLUSION_CALCULATION = "CONCLUSION_CALCULATION",
  CONCLUSION_RESULT = "CONCLUSION_RESULT",
  GAME_END = "GAME_END",
}
