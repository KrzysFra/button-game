import { Room } from "@colyseus/sdk"
import { useEffect, useState } from "react"
import "./button.component.css"


export function Button(
  { room, isHover, isPressed, onPressed, label, width = "8em", height = "8em" }
    : { room?: Room, isHover?: boolean, isPressed?: boolean, onPressed?: (is: boolean) => void, label?: string, width?: string, height?: string }
) {
  const [isHoverL, setIsHoverL] = useState(false)
  const [isPressedL, setIsPressedL] = useState(false)

  const onDown = () => {
    if (isPressed !== undefined) return
    if (isPressedL) return
    setIsPressedL(true)
    room?.send("pressed", true)
    onPressed?.(true)
  }

  const onUp = () => {
    if (isPressed !== undefined) return
    if (!isPressedL) return
    setIsPressedL(false)
    room?.send("pressed", false)
    onPressed?.(false)
  }

  const onMouseEnter = () => {
    if (isHover !== undefined) return
    if (isHoverL) return
    setIsHoverL(true)
    room?.send("hover", true)
  }

  const onMouseLeave = () => {
    if (isHover !== undefined) return
    if (!isHoverL) return
    setIsHoverL(false)
    room?.send("hover", false)
    onUp()
  }

  const [classes, setClasses] = useState("app-button")

  useEffect(() => {
    const newClasses = ["app-button"]
    if (isHoverL || isHover) newClasses.push("is-hover")
    if (isPressedL || isPressed) newClasses.push("is-pressed")

    setClasses(newClasses.join(" "))
  },
    [isHoverL, isPressedL, isHover, isPressed]
  )

  return (
    <div
      className={classes}
      onMouseDown={() => onDown()}
      onMouseUp={() => onUp()}
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={() => onMouseLeave()}
      style={{ height, width }}
    >
      <div className="button">
        <div className="label">{label}</div>
      </div>
    </div>
  )

}