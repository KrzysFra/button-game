import "./button.component.css"

export function Button({ onDown, onUp }: { onDown?: () => void, onUp?: () => {} }) {
  const onDownLocal = () => {
    console.log("onDownLocal")
    onDown?.()
  }

  const onUpLocal = () => {
    console.log("onUpLocal")
    onUp?.()
  }

  return (
    <div
      onMouseDown={() => onDownLocal()}
      onMouseUp={() => onUpLocal()}
      onMouseLeave={() => onUpLocal()}
    >
      button
    </div>
  )

}