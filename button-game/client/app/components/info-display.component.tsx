import { useContext, useState } from "react"
import { InfoDisplayContext } from "../page"
import "./info-display.component.css"

export function InfoDisplay() {
  const infoDisplayContext = useContext(InfoDisplayContext)

  const [show, setShow] = useState(false)

  return (
    <div className="app-info-display">
      <div className="title" onClick={() => setShow(v => !v)}>
        <div className="text">InfoDisplay</div>
        <div className="button">{show ? "X" : "V"}</div>
      </div>
      {show &&
        <div>
          <div className="buttons-bar">
            <div onClick={() => infoDisplayContext.room?.send("cpu-add")}>+CPU</div>
            <div onClick={() => infoDisplayContext.room?.send("cpu-rem")}>-CPU</div>
            <div onClick={() => infoDisplayContext.room?.send("start-phase-end")}>PE</div>
          </div>
          <pre className="content">
            {infoDisplayContext?.iDContext}
          </pre>
        </div>
      }
    </div>
  )
}