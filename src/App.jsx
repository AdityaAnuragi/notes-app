import { useEffect, useLayoutEffect, useRef, useState } from "react"
import '@mantine/core/styles.css';
import "./App.css"
import useThrottle from "./customHooks/useThrottle"
import { TooltipButtonWrapper } from "./components/tooltipButton"
function App() {
  // window.addEventListener("keydown",(e)=>console.log(e));
  const [data, setData] = useState([
    { category: { isCheckBox: false, isChecked: false }, data: "a" },
    { category: { isCheckBox: true, isChecked: false }, data: "Lorem ipsum dolor sit amet." },
    { category: { isCheckBox: true, isChecked: true }, data: "This is the second checkbox" },
    { category: { isCheckBox: false, isChecked: false }, data: "First line\nSecond line" }
  ])

  const [pointer, setPointer] = useState(-1)
  // this tells which snapshot we're currently at out of all the snapshots in the history, -1 means the most recent


  const wasListItemTextAreaUsed = useRef(false) // this holds the boolean value to represent if "+ List item" textarea was recently used

  const indexOfElementToFocusAfterAddingOrRemovingItsCheckbox = useRef(false)
  // the above ref holds the index of the element that needs to be focused when the addOrRemoveTickBox button(to be made) is clicked or a ctrl slash is used

  const indexOfElementToFocusAfterCtrlEnterOrDelete = useRef(false) // holds the index value of element focus after Ctrl + Enter

  const indexOfCurrentlyFocusedElement = useRef(false)
  /* the above ref holds an index value, which used to know which index value to change in the "data" state
    it's only useful for the button on the hotbar that can add/remove a checkbox for a list item
    the keyboard shotcut ctrl + / doesn't need it it's only for the button
  */

  const history = useRef(JSON.parse(JSON.stringify([data])))
  const filteredHistory = useRef(JSON.parse(JSON.stringify([data])))

  const wasRedoJustClicked = useRef(false)

  const addNewItemTextAreaRef = useRef()
  const textareaRef = useRef([])

  // console.log("Above, filtered history is ", filteredHistory.current)
  // console.log("Above, history is ", history.current)
  // console.log(`Pointer is ${pointer}`)
  // console.log(`was add list item used ${wasListItemTextAreaUsed.current}`)
  // console.log(`index to focus after add or del CB ${indexOfElementToFocusAfterAddingOrRemovingItsCheckbox.current}`)
  // console.log(`index to focus after add or del ${indexOfElementToFocusAfterCtrlEnterOrDelete.current}`)
  const enoughTimePassed = useThrottle(750, pointer !== -1)
  if (pointer === -1 && !(wasRedoJustClicked.current)) {
    history.current[history.current.length - 1] = data

    if (enoughTimePassed) {
      history.current.push(data)
      filteredHistory.current = history.current?.slice(0, history.current?.length - 1) // getting all elements except last element
    }
    else {
      filteredHistory.current = history.current?.slice() // slicing the entire array
    }
  }

  function updatingWasredojustclickedHistoryPointer() {
    wasRedoJustClicked.current = false
    // if filter history is [a,b,c,d,e,f,g,h] and pointer is -6 (ie on c) then we delete everything after d
    const isEqualLength = filteredHistory.current.length === history.current.length
    filteredHistory.current = filteredHistory.current.slice(0, pointer + filteredHistory.current.length + 2) // abcd
    if (!isEqualLength) {
      history.current = history.current.slice(0, pointer + history.current.length + 1) //abcd
    }
    else {
      history.current = history.current.slice(0, pointer + history.current.length + 2) //abcd
    }
    // console.log("Inside handle text change, filtered history is")
    // console.log(filteredHistory.current)
    setPointer(-1)
  }

  function handleCtrlEnter(index) {

    const textareaArr = textareaRef.current
    // console.log("inside handleCtrlEnter",textareaArr)
    const element = textareaArr[index]

    indexOfElementToFocusAfterCtrlEnterOrDelete.current = index + 1


    const preText = filteredHistory.current[filteredHistory.current.length + pointer][index].data.slice(0, element.selectionStart)
    const postText = filteredHistory.current[filteredHistory.current.length + pointer][index].data.slice(element.selectionStart)
    createNewElement(index + 1, postText, preText)
  }

  function handleCtrlSlash(index) {
    const duplicate = JSON.parse(JSON.stringify(filteredHistory.current[filteredHistory.current.length + pointer]))
    duplicate[index].category.isCheckBox = !(duplicate[index].category.isCheckBox)
    updatingWasredojustclickedHistoryPointer()
    setData(duplicate)
  }

  function handleKeyDown(e, index) {
    if (e.key === "Enter" && e.ctrlKey && e.shiftKey) { // delete selected element
      e.preventDefault()
      deleteElement(index)
    }

    else if (e.key === "Enter" && e.ctrlKey) { // enter new element
      e.preventDefault()

      // the below change to the ref was moved to the function "handleCtrlEnter" so that the shortcut and the UI can focus on new element
      // indexOfElementToFocusAfterCtrlEnterOrDelete.current = index + 1

      handleCtrlEnter(index)
    }

    else if (e.key === "\\" && e.ctrlKey) { // toggle the checkbox (ticked or unticked)
      e.preventDefault()
      if (filteredHistory.current[filteredHistory.current.length + pointer][index].category.isCheckBox) {
        handleCheckChange(index)
      }
    }

    else if (e.key === "/" && e.ctrlKey) { // toggle between element having checkbox or not
      e.preventDefault()
      indexOfElementToFocusAfterAddingOrRemovingItsCheckbox.current = index
      handleCtrlSlash(index)
    }
    // console.log(e)
  }

  function createNewElement(index, value = "", preText = "") {
    const duplicate = JSON.parse(JSON.stringify(filteredHistory.current[filteredHistory.current.length + pointer]))

    duplicate[index - 1].data = preText

    const elementArr = { category: { isCheckBox: false, isChecked: false }, data: value }
    duplicate.splice(index, 0, elementArr)

    updatingWasredojustclickedHistoryPointer()

    setData(duplicate)
  }

  function handleTextChange(e, index) {
    const duplicate = JSON.parse(JSON.stringify(filteredHistory.current[filteredHistory.current.length + pointer]))
    if (index < duplicate.length) {
      duplicate[index].data = e.target.value
    }
    else {
      duplicate.push({ category: { isCheckBox: false, isChecked: false }, data: `${e.target.value}` })
    }

    updatingWasredojustclickedHistoryPointer()
    setData(duplicate)
  }

  function handleCheckChange(index) {
    const duplicate = JSON.parse(JSON.stringify(filteredHistory.current[filteredHistory.current.length + pointer]))
    duplicate[index].category.isChecked = !(duplicate[index].category.isChecked)

    updatingWasredojustclickedHistoryPointer()

    setData(duplicate)
  }

  function getStyles(index) {
    return {
      color: filteredHistory.current[filteredHistory.current.length + pointer][index].category.isChecked ? "grey" : "black",
      textDecoration: filteredHistory.current[filteredHistory.current.length + pointer][index].category.isChecked ? "line-through" : "none",
    }
  }

  function handleAddListItem(e) {
    const duplicate = JSON.parse(JSON.stringify(filteredHistory.current[filteredHistory.current.length + pointer]))
    duplicate.push({ category: { isCheckBox: false, isChecked: false }, data: `${e.target.value}` })
    wasListItemTextAreaUsed.current = true
    e.target.value = ""
    updatingWasredojustclickedHistoryPointer()
    setData(duplicate)
  }

  function handleFocusOnLastElementWithAddButtonClick(node) {
    node?.focus()
    node?.setSelectionRange(node.value.length, node.value.length)
    wasListItemTextAreaUsed.current = false
  }

  function handleFocusingAddListItemWhenNoElementsInState(node) {
    if (node && data.length === 0) {
      node.focus()
    }
  }

  function callbackForRef(node, index) {
    if (!node) return

    if (indexOfCurrentlyFocusedElement.current === index) {
      node?.focus()
      node?.setSelectionRange(node.selectionStart, node.selectionStart)
    }

    if (index === filteredHistory.current[filteredHistory.current.length + pointer].length - 1 && wasListItemTextAreaUsed.current) { // focus on the last element if + List item text area was used
      handleFocusOnLastElementWithAddButtonClick(node)
    }

    if (indexOfElementToFocusAfterCtrlEnterOrDelete.current === index) { // focus on the element that comes after the element that was just deleted (else if condition if the last element was deleted)
      node?.focus()
      indexOfElementToFocusAfterCtrlEnterOrDelete.current = false
    }
    else if (indexOfElementToFocusAfterCtrlEnterOrDelete.current === filteredHistory.current[filteredHistory.current.length + pointer].length) {
      const addListItemTextArea = addNewItemTextAreaRef.current
      addListItemTextArea?.focus()
      indexOfElementToFocusAfterCtrlEnterOrDelete.current = false
    }

    if (indexOfElementToFocusAfterAddingOrRemovingItsCheckbox.current === index) { // focus on the element that was toggled from having a checkbox or not
      node?.focus()
      node?.setSelectionRange(node.value.length, node.value.length)
      indexOfElementToFocusAfterAddingOrRemovingItsCheckbox.current = false
    }

  }

  function deleteElement(index) {
    const duplicate = JSON.parse(JSON.stringify(filteredHistory.current[filteredHistory.current.length + pointer]))
    duplicate.splice(index, 1)
    indexOfElementToFocusAfterCtrlEnterOrDelete.current = index
    updatingWasredojustclickedHistoryPointer()
    setData(duplicate)
  }

  useLayoutEffect(() => {
    // console.log(textareaRef.current)
    const collection = textareaRef.current
    for (let i = 0; i < collection.length; i += 1) {
      if (collection[i]) {
        collection[i].style.height = "0px"
        collection[i].style.height = `${(collection[i].scrollHeight) + 4}px`
      }
    }
    if (addNewItemTextAreaRef.current) {
      addNewItemTextAreaRef.current.style.height = "0px"
      addNewItemTextAreaRef.current.style.height = `${(addNewItemTextAreaRef.current.scrollHeight) + 4}px`
    }
  }, [data, pointer])

  function handleUndo() {
    // console.log(`Inside handleUndo, Pointer is ${pointer}`)
    // console.log(`Inside handleUndo, fh len is ${filteredHistory.current.length}`)
    setPointer((prev) => prev - 1)
  }

  function handleRedo() {
    wasRedoJustClicked.current = true
    setPointer((prev) => prev + 1)
  }

  function canIUndo(e) {
    // if(e.key === "z" && e.ctrlKey) console.log(`Inside canIUndo ${pointer*-1 !== filteredHistory.current.length}`)
    if (e.key === "z" && e.ctrlKey) e.preventDefault()
    if (e.key === "z" && e.ctrlKey && (pointer * -1 !== filteredHistory.current.length)) {
      // console.log(`${e.key === "z" && e.ctrlKey && (pointer * -1 !== filteredHistory.current.length)}`)
      // console.log(e)
      handleUndo()
    }
  }

  function canIRedo(e) {
    if ((e.key === "y" || (e.key === "Z" && e.shiftKey)) && e.ctrlKey) e.preventDefault()
    if ((e.key === "y" || (e.key === "Z" && e.shiftKey)) && e.ctrlKey && pointer !== -1) {
      handleRedo()
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", canIUndo)
    window.addEventListener("keydown", canIRedo)
    return () => {
      window.removeEventListener("keydown", canIUndo)
      window.removeEventListener("keydown", canIRedo)
    }
  })

  function handleOnFocus(index) {
    indexOfCurrentlyFocusedElement.current = index
    // console.log(`Index to focus ${indexOfCurrentlyFocusedElement.current}`)
  }

  // console.log("Below, The filtered history is", filteredHistory.current)
  // console.log("Below, history is ", history.current)
  // console.log("")
  // console.log(`was add list item used ${wasListItemTextAreaUsed.current}`)
  // console.log(`index to focus after add or del CB ${indexOfElementToFocusAfterAddingOrRemovingItsCheckbox.current}`)
  // console.log(`index to focus after add or del ${indexOfElementToFocusAfterCtrlEnterOrDelete.current}`)
  // console.log("")

  useEffect(() => {
    console.log("A project by Aditya Anuragi")
  }, [])
  const aVar = useRef();
  return (
    <div id="spanningTheWholeViewWidthAndHeightWrapper" ref={aVar}>
      <div id="individualNoteContainer" >
        <div id="elementContainer">
          {filteredHistory.current[filteredHistory.current.length + pointer] && filteredHistory.current[filteredHistory.current.length + pointer].map((element, index) => {
            return (
              <div className="textAreaContainer" key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }} >
                <div className="inputAndTextAreaSubWrapper" style={{ display: "flex", alignItems: "flex-start" }}>
                  {element.category.isCheckBox && <input type="checkbox" checked={filteredHistory.current[filteredHistory.current.length + pointer][index].category.isChecked} onChange={() => handleCheckChange(index)} />}
                  <textarea style={getStyles(index)} value={filteredHistory.current[filteredHistory.current.length + pointer][index].data} className="textarea" ref={(node) => {
                    callbackForRef(node, index)
                    textareaRef.current[index] = node
                  }} onChange={(e) => handleTextChange(e, index)} onKeyDown={(e) => handleKeyDown(e, index)} onFocus={() => handleOnFocus(index)} />
                </div>
                <div className="twoButtonContainer">
                  <TooltipButtonWrapper
                    shortcut="Enter"
                    buttonProps={{
                      className: "listItemButtons roundedButton",
                      onClick: () => handleCtrlEnter(index)
                    }}
                    logoName="fa-solid fa-plus"
                    index={index}
                    offset={{ mainAxis: -13, crossAxis: -10 }}
                    textAreaRefs={textareaRef}
                  />
                  {/* <button className="listItemButtons roundedButton" onClick={() => handleCtrlEnter(index)} ><i className="fa-solid fa-plus"></i></button> */}
                  <TooltipButtonWrapper
                    shortcut="Shift+Enter"
                    buttonProps={{
                      className: "listItemButtons roundedButton",
                      onClick: () => deleteElement(index)
                    }}
                    logoName="fa-solid fa-trash"
                    index={index}
                    textAreaRefs = {textareaRef}
                  />
                  {/* <button className="listItemButtons roundedButton" onClick={() => deleteElement(index)} ><i className="fa-solid fa-trash"></i></button> */}
                </div>
              </div>
            )
          })}
          <div className="textAreaContainer">
            <textarea id="addNewItemTextArea" className="textarea" placeholder="+ List item" ref={(node) => {
              handleFocusingAddListItemWhenNoElementsInState(node)
              addNewItemTextAreaRef.current = node
            }} onChange={handleAddListItem} />
          </div>
        </div>
        <footer>
          <TooltipButtonWrapper
            shortcut="/"
            buttonProps={{
              className: "roundedButton",
              onClick: () => handleCtrlSlash(indexOfCurrentlyFocusedElement.current)
            }}
            logoName="fa-regular fa-square-check"
            textAreaRefs = {textareaRef}
          />
          <div id="undoRedoContainer">

            <TooltipButtonWrapper
              shortcut="Z"
              buttonProps={{
                className: "roundedButton",
                onClick: handleUndo,
                disabled: pointer * -1 === filteredHistory.current.length,
                style: { cursor: (pointer * -1 === filteredHistory.current.length) ? "not-allowed" : "auto" }
              }}
              logoName="fa-solid fa-rotate-left"
              textAreaRefs = {textareaRef}
            />

            <TooltipButtonWrapper
              shortcut="Y"
              buttonProps={{
                className: "roundedButton",
                onClick: handleRedo,
                disabled: pointer === -1,
                style: { cursor: pointer === -1 ? "not-allowed" : "auto" }
              }}
              logoName="fa-solid fa-rotate-right"
              textAreaRefs = {textareaRef}
            />

            {/* Redo button */}
          </div>
          <button>Close</button>
        </footer>
      </div>
    </div>
  )
  // return(
  //   <>
  //     <TooltipButton>
  //       <i className="fa-solid fa-rotate-right"></i>
  //     </TooltipButton>  
  //   </>
  // )
}

export default App
