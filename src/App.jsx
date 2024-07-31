import { NoteInHomePage } from "./components/NoteInHomePage"
import { OpenNote } from "./components/OpenNote"
import styles from "./App.module.css"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
function App() {

  const [allNotes , setAllNotes] = useState([
    [
      { category: { isCheckBox: false, isChecked: false }, data: "Sample data" }
    ],
    [
      { category: { isCheckBox: false, isChecked: false }, data: "Hold ctrl to see shortcut" },
      { category: { isCheckBox: true, isChecked: true }, data: "this is ticked" },
      { category: { isCheckBox: false, isChecked: false }, data: "regular note" },
      { category: { isCheckBox: false, isChecked: false }, data: "A fourth item that is hidden" }
    ],
    [
      { category: { isCheckBox: false, isChecked: false }, data: "second note" }
    ]
  ])

  const [openNoteIndex , setOpenNoteIndex] = useState(-1)

  const [n, setN] = useState(1)
  // console.log(n)
  const containerRef = useRef()

  function totalColumnsOnScreen() {
    // console.log(document.getElementsByTagName("html")[0].clientWidth)
    const windowWidth = document.getElementsByTagName("html")[0].clientWidth
    // console.log(`inside, ${windowWidth}`)
    if (windowWidth < 425) {
      return 1
    }

    else if (windowWidth < 1024) {
      return 2
    }

    else {
      return 3
    }

  }

  function addNewNote() {
    setAllNotes(prev => {
      const duplicate = JSON.parse(JSON.stringify(prev))
      duplicate.unshift([
        { category: { isCheckBox: false, isChecked: false }, data: "A fresh new note" }
      ])
      return duplicate
    })
  }

  useLayoutEffect(() => {
    // console.log(styles)
    // console.log(containerRef.current.className.includes(styles.))
    // for (const homePageNote of containerRef.current.children) {
    //   if(!(homePageNote.className.includes(styles.fillSpace))) {
    //     console.log(homePageNote , homePageNote.clientHeight)
    //   }
    // }

    const totalColumns = totalColumnsOnScreen()
    const arrOfNotesOnly = []
    for (const ele of containerRef.current.children) {
      if (!(ele.className.includes(styles.fillSpace))) {
        arrOfNotesOnly.push(ele)
      }
    }

    let maxHeightOfAllColumns = 0
    let i = 0
    while (i < totalColumns) {
      let j = i
      let heightOfColumn = 0
      while (j < arrOfNotesOnly.length) {
        // console.log(arrOfNotesOnly[j] , arrOfNotesOnly[j].clientHeight)

        let topBorder =  window.getComputedStyle(arrOfNotesOnly[j]).getPropertyValue("border-top-width")
        topBorder = Math.round(parseFloat(topBorder.slice(topBorder.length*-1,-2)))

        let bottomBorder =  window.getComputedStyle(arrOfNotesOnly[j]).getPropertyValue("border-bottom-width")
        bottomBorder = Math.round(parseFloat(bottomBorder.slice(bottomBorder.length*-1,-2)))
        
        let marginBottom = window.getComputedStyle(arrOfNotesOnly[j]).getPropertyValue("margin-bottom")
        marginBottom = Math.round(parseFloat(marginBottom.slice(marginBottom.length*-1,-2)))

        // console.log(topBorder ,bottomBorder,marginBottom)

        heightOfColumn += (arrOfNotesOnly[j].clientHeight + topBorder + bottomBorder + marginBottom)
        j += totalColumns
      }
      maxHeightOfAllColumns = heightOfColumn > maxHeightOfAllColumns ? heightOfColumn : maxHeightOfAllColumns
      i += 1
    }

    // console.log(`Max ht required is ${maxHeightOfAllColumns}`)
    // console.log(`cols : ${totalColumns}`)
    // console.log("")

    containerRef.current.style.height = `${maxHeightOfAllColumns + 60}px`
  })

  useEffect(() => {
    window.addEventListener("resize", () => setN((prev) => {
      return (prev+1)*n
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log("A project by Aditya Anuragi")
  },[])

  return (
    <>
      {(openNoteIndex !== -1) && <OpenNote initialState={allNotes[openNoteIndex]} onClickCallbackToCloseAnOpenNote={() => setOpenNoteIndex(-1)} />}
      <button className={`${styles.newNoteButton} ${styles.unselectable} `} onClick={addNewNote} >New Note</button>
      <div className={styles.container} ref={containerRef} >
        
        {allNotes && allNotes.map((note,index) => {
          return <NoteInHomePage key={index} completeHomePageNoteData={note} onClickCallback={() => setOpenNoteIndex(index)} />
        })}

        <div className={styles.fillSpace} ></div>
        <div className={styles.fillSpace} ></div>
      </div>

    </>
  )
}

export default App
