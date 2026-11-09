import { useContext, useState } from "react"
import { InfoDisplayContext } from "../page"
import "./info-display.component.css"

export function InfoDisplay() {
  const infoDisplayContext = useContext(InfoDisplayContext)

  const [show, setShow] = useState(true)

  return (
    <div className="app-info-display">
      <div className="title" onClick={() => setShow(v => !v)}>
        <div className="text">InfoDisplay</div>
        <div className="button">{show ? "X" : "V"}</div>
      </div>
      {show &&
        <pre className="content">
          {infoDisplayContext?.iDContext}
        </pre>
      }

    </div>
  )
}