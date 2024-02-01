import { Tooltip } from "@mantine/core"
import { useEffect, useState } from "react"

function TooltipButtonWrapper({ shortcut, position = "top", offset = -15, buttonProps, logoName }) {
  const [isOpen, setIsOpen] = useState(false)

  function handleMouseEnter() {
    setIsOpen(true)
  }

  function handleMouseLeave() {
    setIsOpen(false)
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.ctrlKey) {
        setIsOpen(true)
      }
    }

    function handleKeyUp(e) {
      if (e.key === "Control") {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }

  }, [])

  return (
    <>
      <Tooltip
        opened={isOpen}
        label={shortcut}
        position={position}
        offset={offset}
      >
        <button
          onMouseOver={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={buttonProps.className}
          onClick={buttonProps.onClick} // not all elements have an onClick or styles (such as checkbox) but it's fine they're null here
          disabled={buttonProps.disabled}
          style={buttonProps.style}
        >
          <i className={logoName}></i>
        </button>
      </Tooltip>
    </>
  )
}

export {
  TooltipButtonWrapper
}