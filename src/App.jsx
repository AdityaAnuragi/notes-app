import { useLayoutEffect, useRef, useState } from "react"
import "./App.css"

function App() {

  const [data, setData] = useState([
    { category: { isCheckBox: false, isChecked: false }, data: "first\nsecond" },
    { category: { isCheckBox: true, isChecked: false }, data: "This is a checkbox" },
    { category: { isCheckBox: true, isChecked: true }, data: "This is the second checkbox" },
    { category: { isCheckBox: false, isChecked: false }, data: "First line\nSecond line" }
  ])

  const wasAddButtonClicked = useRef(false)
  const indexOfElementCtrlSlashed = useRef(false)

  function handleCtrlEnter(e, index) {
    const preText = data[index].data.slice(0, e.target.selectionStart)
    const postText = data[index].data.slice(e.target.selectionStart)
    createNewElement(index + 1, postText, preText)
  }

  function handleCtrlSlash (index) {
    const duplicate = JSON.parse(JSON.stringify(data))
    duplicate[index].category.isCheckBox = !(duplicate[index].category.isCheckBox)
    setData(duplicate)
  }

  function handleKeyDown(e, index) {
    if (e.key === "Enter" && e.ctrlKey) {
      handleCtrlEnter(e,index)
    }
    else if(e.key === "/" && e.ctrlKey) {
      indexOfElementCtrlSlashed.current = index
      handleCtrlSlash(index)
    }
  }

  function createNewElement(index = -1, value = "", preText = "") {
    const duplicate = JSON.parse(JSON.stringify(data))

    if (index !== -1) {
      duplicate[index - 1].data = preText
    }

    const elementArr = { category: { isCheckBox: false, isChecked: false }, data: value }
    duplicate.splice(index, 0, elementArr)
    setData(duplicate)
  }

  function handleTextChange(e, index) {
    // e.target.style.height = "0px"
    // e.target.style.height = `${e.target.scrollHeight}px`

    const duplicate = JSON.parse(JSON.stringify(data))
    duplicate[index].data = e.target.value
    // console.log(window.getComputedStyle(e.target).getPropertyValue("height"))
    setData(duplicate)
  }

  function handleCheckChange(index) {
    const duplicate = JSON.parse(JSON.stringify(data))
    duplicate[index].category.isChecked = !(duplicate[index].category.isChecked)
    setData(duplicate)
  }

  function getStyles(index) {
    return {
      color: data[index].category.isChecked ? "grey" : "black",
      textDecoration: data[index].category.isChecked ? "line-through" : "none",
    }
  }

  function handleButtonClick() {
    const duplicate = JSON.parse(JSON.stringify(data))
    duplicate.push({ category: { isCheckBox: false, isChecked: false }, data: "" })
    wasAddButtonClicked.current = true
    setData(duplicate)
  }

  function handleFocusOnLastElementWithAddButtonClick(node) {
    node.focus()
    wasAddButtonClicked.current = false
  }

  function callbackForRef(node, index) {
    if (index === data.length - 1 && node && wasAddButtonClicked.current) {
      handleFocusOnLastElementWithAddButtonClick(node)
    }

    if(indexOfElementCtrlSlashed.current === index && node) {
      console.log(indexOfElementCtrlSlashed.current)
      node?.focus()
      indexOfElementCtrlSlashed.current = false
    }

  }

  function deleteElement(index) {
    const duplicate = JSON.parse(JSON.stringify(data))
    duplicate.splice(index, 1)
    setData(duplicate)
  }

  useLayoutEffect(() => {
    const collection = document.getElementsByClassName("textarea")
    for (let i = 0; i < collection.length; i += 1) {
      collection[i].style.height = "0px"
      collection[i].style.height = `${(collection[i].scrollHeight) + 4}px`
    }
  }, [data])

  return (
    <div id="individualNoteContainer" >
      {data.map((element, index) => {
        if (element.category.isCheckBox) {
          return (
            <div className="textAreaContainer" key={index} style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start" }} >
              <input type="checkbox" checked={data[index].category.isChecked} onChange={() => handleCheckChange(index)} />
              <textarea style={getStyles(index)} value={data[index].data} className="textarea" ref={(node) => callbackForRef(node, index)} onChange={(e) => handleTextChange(e, index)} onKeyDown={(e) => handleKeyDown(e, index)} />
              <button className="deleteButton" onClick={() => deleteElement(index)} >Del</button>
            </div>
          )
        }
        return (
          <div className="textAreaContainer" key={index} style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }} >
            <textarea style={{ resize: "none", display: "block" }} value={data[index].data} className="textarea" ref={(node) => callbackForRef(node, index)} onChange={(e) => handleTextChange(e, index)} onKeyDown={(e) => handleKeyDown(e, index)} />
            <button className="deleteButton" onClick={() => deleteElement(index)} >Del</button>
          </div>
        )
      })}
      <button id="addNewItemButton" onClick={handleButtonClick} > + Add list item</button>
    </div>
  )

}

export default App
