"use client"

import { Room } from "@colyseus/sdk"
import { createContext, Dispatch, SetStateAction, useState } from "react"
import { Game } from "./functions/game.function"

export const InfoDisplayContext = createContext<
  {
    iDContext?: string,
    setIDContext?: Dispatch<SetStateAction<string>>,
    room?: Room,
    setRoom?: Dispatch<SetStateAction<Room | undefined>>
  }>
  ({})

export default function Home() {
  const [iDContext, setIDContext] = useState<string>("")
  const [room, setRoom] = useState<Room | undefined>(undefined)

  return (
    <InfoDisplayContext.Provider value={{ iDContext, setIDContext, room, setRoom }}>
      <div>
        <Game />
        {/* <InfoDisplay /> */}
      </div>
    </InfoDisplayContext.Provider>
  )
}
