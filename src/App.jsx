import { useEffect, useLayoutEffect, useRef, useState } from "react"
import "./App.css"
import useThrottle from "./customHooks/useThrottle"

function App() {

  const [data, setData] = useState([
    { category: { isCheckBox: false, isChecked: false }, data: "a" },
    { category: { isCheckBox: true, isChecked: false }, data: "This is a checkbox" },
    { category: { isCheckBox: true, isChecked: true }, data: "This is the second checkbox" },
    { category: { isCheckBox: false, isChecked: false }, data: "First line\nSecond line" }
  ])
  const snapShotHistory = useRef([data])
  snapShotHistory.current[snapShotHistory.current.length - 1] = data
  console.log("top level ",snapShotHistory.current[snapShotHistory.current.length-1][0].data)


  const wasListItemTextAreaUsed = useRef(false) // this holds the boolean value to represent if "+ List item" textarea was recently used
  const indexOfElementCtrlSlashed = useRef(false) // this holds the index of the element that was Ctrl slashed
  const indexOfElementToFocusAfterCtrlEnterOrDelete = useRef(false) // holds the index value of element focus after Ctrl + Enter
  
  const hasChanged = useThrottle(10000)

  useEffect(() => {
    console.log("useEffect triggered")
    console.log("")
    return () => {
      if(hasChanged) {
        snapShotHistory.current.splice(snapShotHistory.current.length-1,0,data) 
        console.log("My snapshot history is ",snapShotHistory.current)
      }
    }
  },[hasChanged])


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
    if (e.key === "Enter" && e.ctrlKey && e.shiftKey) { // delete selected element
      deleteElement(index)
    }
    
    else if (e.key === "Enter" && e.ctrlKey) { // enter new element
      indexOfElementToFocusAfterCtrlEnterOrDelete.current = index+1
      handleCtrlEnter(e,index)
    }

    else if (e.key === "\\" && e.ctrlKey) { // toggle the checkbox (ticked or unticked)
      if(data[index].category.isCheckBox) {
        handleCheckChange(index)
      }
    }

    else if(e.key === "/" && e.ctrlKey) { // toggle between element having checkbox or not
      indexOfElementCtrlSlashed.current = index
      handleCtrlSlash(index)
    }
    // console.log(e)
  }

  function createNewElement(index, value = "", preText = "") {
    const duplicate = JSON.parse(JSON.stringify(data))

    duplicate[index - 1].data = preText

    const elementArr = { category: { isCheckBox: false, isChecked: false }, data: value }
    duplicate.splice(index, 0, elementArr)
    setData(duplicate)
  }

  function handleTextChange(e, index) {
    const duplicate = JSON.parse(JSON.stringify(data))
    if (index < duplicate.length) {
      duplicate[index].data = e.target.value
    }
    else {
      duplicate.push({ category: { isCheckBox: false, isChecked: false }, data: `${e.target.value}` })
    }
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

  function handleAddListItem(e) {
    const duplicate = JSON.parse(JSON.stringify(data))
    duplicate.push({ category: { isCheckBox: false, isChecked: false }, data: `${e.target.value}` })
    wasListItemTextAreaUsed.current = true
    e.target.value = ""
    setData(duplicate)
  }

  function handleFocusOnLastElementWithAddButtonClick(node) {
    node?.focus()
    node?.setSelectionRange(node.value.length,node.value.length)
    wasListItemTextAreaUsed.current = false
  }

  function handleFocusingAddListItemWhenNoElementsInState(node) {
    if(node && data.length === 0) {
      node.focus()
    }
  }

  function callbackForRef(node, index) {
    if (!node) return

    if (index === data.length - 1 && wasListItemTextAreaUsed.current) { // focus on the last element if + List item text area was used
      handleFocusOnLastElementWithAddButtonClick(node)
    }

    if (indexOfElementToFocusAfterCtrlEnterOrDelete.current === index) { // focus on the element that comes after the element that was just deleted (else if condition if the last element was deleted)
      node?.focus()
      indexOfElementToFocusAfterCtrlEnterOrDelete.current = false
    }
    else if(indexOfElementToFocusAfterCtrlEnterOrDelete.current === data.length) {
      const addListItemTextArea = document.getElementById("addNewItemTextArea")
      addListItemTextArea.focus()
    }

    if(indexOfElementCtrlSlashed.current === index && node) { // focus on the element that was toggled from having a checkbox or not
      node?.focus()
      node?.setSelectionRange(node.value.length,node.value.length)
      indexOfElementCtrlSlashed.current = false
    }

  }

  function deleteElement(index) {
    const duplicate = JSON.parse(JSON.stringify(data))
    duplicate.splice(index, 1)
    indexOfElementToFocusAfterCtrlEnterOrDelete.current = index
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
      <div className="textAreaContainer">
        <textarea id="addNewItemTextArea" className="textarea" placeholder="+ List item" ref={handleFocusingAddListItemWhenNoElementsInState} onChange={handleAddListItem} />
      </div>
    </div>
  )

}

export default App
