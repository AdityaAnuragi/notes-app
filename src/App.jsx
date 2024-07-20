import { NoteInHomePage } from "./components/NoteInHomePage"
import styles from "./App.module.css"
function App() {

  return (
    <>
      <div className={styles.container} >
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
