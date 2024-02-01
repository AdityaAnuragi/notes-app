import { Tooltip } from "@mantine/core"
import { useEffect, useState } from "react"

function TooltipButtonWrapper({ shortcut, position = "top", offset = -13, buttonProps, logoName, index = -1 }) {
  const [isOpen, setIsOpen] = useState(false)

  function handleMouseEnter() {
    setIsOpen(true)
  }

  function handleMouseLeave() {
    setIsOpen(false)
  }

  useEffect(() => {
    function handleKeyDown(e) {
      const textareaCollection = document.getElementsByTagName("textarea")
      const isFocused = textareaCollection[index] === document.activeElement
      if (e.ctrlKey && (index === -1 || isFocused)) {
        setIsOpen(true)
      }
    }

    function handleKeyUp(e) {
      const textareaCollection = document.getElementsByTagName("textarea")
      const isFocused = textareaCollection[index] === document.activeElement
      if (e.key === "Control" && (index === -1 || isFocused)) {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }

  }, [index])

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