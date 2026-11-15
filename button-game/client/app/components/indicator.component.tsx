import { useEffect, useState } from "react"
import "./indicator.component.css"

export enum IndicatorColors {
  BLACK = "BLACK",
  RED = "RED",
  YELLOW = "YELLOW",
  BLUE = "BLUE",
  GREEN = "GREEN",
}

export function Indicator({ color }: { color: IndicatorColors }) {
  const [classes, setClasses] = useState(["app-indicator"])

  useEffect(() => {
    setClasses(["app-indicator", color])
  }, [color])

  return <div className={classes.join(" ")}></div>
}