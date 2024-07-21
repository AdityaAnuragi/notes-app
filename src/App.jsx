import { NoteInHomePage } from "./components/NoteInHomePage"
import styles from "./App.module.css"
import { useLayoutEffect, useRef } from "react"
function App() {

  const containerRef = useRef()

  function totalColumnsOnScreen() {
    const windowWidth = window.innerWidth

    if(windowWidth <= 425) {
      return 1
    }

    else if(windowWidth <= 1024) {
      return 2
    }

    else {
      return 3
    }

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
    for( const ele of  containerRef.current.children) {
      if (!(ele.className.includes(styles.fillSpace))) {
        arrOfNotesOnly.push(ele)
      }
    }
    
    let maxHeightOfAllColumns = 0
    let i = 0
    while(i < totalColumns ) {
      let j = i
      let heightOfColumn = 0
      while(j < arrOfNotesOnly.length) {
        console.log(arrOfNotesOnly[j] , arrOfNotesOnly[j].clientHeight)
        heightOfColumn  += arrOfNotesOnly[j].clientHeight
        j+=totalColumns
      }
      maxHeightOfAllColumns = heightOfColumn > maxHeightOfAllColumns ? heightOfColumn : maxHeightOfAllColumns
      i+=1
    }

    console.log(`Max ht required is ${maxHeightOfAllColumns}`)

    console.log(window.innerWidth)
    console.log(totalColumnsOnScreen())
    

    containerRef.current.style.height = `${maxHeightOfAllColumns+60}px`
  })

  return (
    <>
      <div className={styles.container} ref={containerRef} >
        <NoteInHomePage elementsInHomeNote={1} />
        <NoteInHomePage elementsInHomeNote={2} />
        <NoteInHomePage elementsInHomeNote={3} />
        <NoteInHomePage elementsInHomeNote={4} />
        <NoteInHomePage elementsInHomeNote={5} />
        <NoteInHomePage elementsInHomeNote={6} />

        <div className={styles.fillSpace} ></div>
        <div className={styles.fillSpace} ></div>
      </div>

    </>
  )
}

export default App
