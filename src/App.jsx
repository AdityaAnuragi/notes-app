import { NoteInHomePage } from "./components/NoteInHomePage"
import styles from "./App.module.css"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
function App() {
  const [n , setN] = useState(1)
  // console.log(n)
  const containerRef = useRef()

  function totalColumnsOnScreen() {
    // console.log(document.getElementsByTagName("html")[0].clientWidth)
    const windowWidth = document.getElementsByTagName("html")[0].clientWidth
    // console.log(`inside, ${windowWidth}`)
    if(windowWidth < 425) {
      return 1
    }

    else if(windowWidth < 1024) {
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
        // console.log(arrOfNotesOnly[j] , arrOfNotesOnly[j].clientHeight)
        heightOfColumn  += arrOfNotesOnly[j].clientHeight
        j+=totalColumns
      }
      maxHeightOfAllColumns = heightOfColumn > maxHeightOfAllColumns ? heightOfColumn : maxHeightOfAllColumns
      i+=1
    }

    // console.log(`Max ht required is ${maxHeightOfAllColumns}`)

    // console.log(`window width is ${window.innerWidth}`)
    // console.log(`cols : ${totalColumns}`)
    // console.log("")

    containerRef.current.style.height = `${maxHeightOfAllColumns+60}px`
  })

  useEffect(() => {
    window.addEventListener("resize",() => setN((n) => n+1))
  },[])

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
