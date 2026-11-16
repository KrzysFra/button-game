import { useRef, useState } from "react"
import "./name-overlay.component.css"
import { Room } from "@colyseus/sdk"

export function NameOverlay({ room }: { room: Room | undefined }) {
  const [name, setName] = useState("")
  // const nameRef 

  const isValid = name.length > 0

  const accept = () => {
    if (!isValid) return
    room?.send("my-name", name)
  }

  return (<div className="app-name-overlay">
    <div>
      <div className="label">YOUR NAME:</div>
      <div className="input">
        <input maxLength={12} onChange={(e) => setName(e.target.value)} />
      </div>
      <div
        className={"button" + (!isValid ? " disabled" : "")}
        onClick={() => accept()}
      >ACCEPT</div>
    </div>

  </div>)
}