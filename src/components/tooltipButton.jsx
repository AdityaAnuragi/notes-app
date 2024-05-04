import { Tooltip } from "@mantine/core"
import { useEffect, useState } from "react"
import openNoteStyle from "./OpenNote.module.css"
import '@mantine/core/styles.css';
function TooltipButtonWrapper({ shortcut, position = "top", offset = -13, buttonProps, logoName, index = -1, textareas }) {
  const [isOpen, setIsOpen] = useState(false)
  // console.log(document.activeElement)
  // receive ref to textarea element
  function handleMouseEnter() {
    if ((textareas[index] === document.activeElement) || index === -1) {
      setIsOpen(true)
    }
  }

  function handleMouseLeave() {
    if ((textareas[index] === document.activeElement) || index === -1) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    function handleBlur() {
      setIsOpen(false)
    }
    const currElement = textareas[index]
    if (index !== -1) {
      currElement.addEventListener("blur", handleBlur)
    }


    function handleKeyDown(e) {
      if (e.ctrlKey && ((textareas[index] === document.activeElement) || index === -1)) {
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
        currElement.removeEventListener("blur",handleBlur)
      }
    }

  },[])

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
          className={buttonProps.className + openNoteStyle.button}
          onClick={buttonProps.onClick} // not all elements have an onClick or styles (such as checkbox) but it's fine they're null here
          disabled={buttonProps.disabled}
          style={buttonProps.style}
        >
          <i className={logoName + " " + openNoteStyle.i}></i>
        </button>
      </Tooltip>
    </>
  )
}

export {
  TooltipButtonWrapper
}