import { Tooltip } from "@mantine/core"
import { useEffect, useState } from "react"

function TooltipButtonWrapper({ shortcut, position = "top", offset = -13, buttonProps, logoName, index = -1,textAreaRefs }) {
  const [isOpen, setIsOpen] = useState(false)
  // console.log(document.activeElement)
  // receive ref to textarea
  function handleMouseEnter() {
    if ((textAreaRefs.current[index] === document.activeElement) || index === -1) {
      setIsOpen(true)
    }
  }

  function handleMouseLeave() {
    if ((textAreaRefs.current[index] === document.activeElement) || index === -1) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    function handleBlur() {
      setIsOpen(false)
    }
    const currElement = textAreaRefs.current[index]
    if (index !== -1) {
      currElement.addEventListener("blur", handleBlur)
    }


    function handleKeyDown(e) {
      if (e.ctrlKey && ((textAreaRefs.current[index] === document.activeElement) || index === -1)) {
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