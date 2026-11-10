import { Room } from "@colyseus/sdk"
import { useEffect, useState } from "react"
import "./button.component.css"


export function Button({ room }: { room: Room | undefined }) {
  const [isHover, setIsHover] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const onDown = () => {
    setIsPressed(true)
    room?.send("pressed", true)
  }

  const onUp = () => {
    setIsPressed(false)
    room?.send("pressed", false)
  }

  const onMouseEnter = () => {
    setIsHover(true)
    room?.send("hover", true)
  }

  const onMouseLeave = () => {
    setIsHover(false)
    room?.send("hover", false)
    onUp()
  }

  const [classes, setClasses] = useState("app-button")

  useEffect(() => {
    const newClasses = ["app-button"]
    if (isHover) newClasses.push("is-hover")
    if (isPressed) newClasses.push("is-pressed")

    setClasses(newClasses.join(" "))
  },
    [isHover, isPressed]
  )

  return (
    <div
      className={classes}
    >
      <div className="button-container"
        onMouseDown={() => onDown()}
        onMouseUp={() => onUp()}
        onMouseEnter={() => onMouseEnter()}
        onMouseLeave={() => onMouseLeave()}
      >
        <div className="button">
          mybutton
        </div>
      </div>
    </div>
  )

}