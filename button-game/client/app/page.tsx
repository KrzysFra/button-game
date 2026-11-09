"use client"

import { createContext, Dispatch, SetStateAction, useState } from "react"
import { InfoDisplay } from "./components/info-display.component"
import { Game } from "./functions/game.function"

export const InfoDisplayContext = createContext<
  {
    iDContext: string,
    setIDContext: Dispatch<SetStateAction<string>>
  } | undefined>
  (undefined)

export default function Home() {
  const [iDContext, setIDContext] = useState<string>("")

  return (
    <InfoDisplayContext.Provider value={{ iDContext, setIDContext }}>
      <div>
        <Game />
        <InfoDisplay />
      </div>
    </InfoDisplayContext.Provider>
  )
}
