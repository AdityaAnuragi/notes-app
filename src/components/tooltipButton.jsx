import { Tooltip } from "@mantine/core"
import { useEffect, useState } from "react"

function TooltipButtonWrapper({ shortcut, position = "top", offset = -13, buttonProps, logoName, index = -1 }) {
  const [isOpen, setIsOpen] = useState(false)

  function handleMouseEnter() {
    if ((document.getElementsByTagName("textarea")[index] === document.activeElement) || index === -1) {
      setIsOpen(true)
    }
  }

  function handleMouseLeave() {
    if (document.getElementsByTagName("textarea")[index] === document.activeElement || index === -1) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    function handleBlur() {
      setIsOpen(false)
    }
    const currElement = document.getElementsByTagName("textarea")[index]
    if (index !== -1) {
      currElement.addEventListener("blur", handleBlur)
    }


    function handleKeyDown(e) {
      const textareaCollection = document.getElementsByTagName("textarea")
      const isFocused = textareaCollection[index] === document.activeElement
      if (e.ctrlKey && (index === -1 || isFocused)) {
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
      if (index !== -1) {
        currElement.removeEventListener("blue",handleBlur)
      }
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