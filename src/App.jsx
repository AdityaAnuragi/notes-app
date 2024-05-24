// import { OpenNote } from "./components/OpenNote"
import { NoteInHomePage } from "./components/NoteInHomePage"
function App() {
  return (
    <>
      {/* <OpenNote /> */}
      <div style={{
        border : "3px solid red" ,
        width : "100%",

        display : "flex",        
        alignItems : "flex-start",
        flexFlow : "row wrap",
        alignContent : "flex-start",
      }} 
      >
        <NoteInHomePage />
        <NoteInHomePage elementsInHomeNote={1} />
        <NoteInHomePage elementsInHomeNote={4} />
        <NoteInHomePage elementsInHomeNote={2} />
        <NoteInHomePage elementsInHomeNote={2} />
        <NoteInHomePage elementsInHomeNote={2} />
        <NoteInHomePage elementsInHomeNote={2} />
        <NoteInHomePage elementsInHomeNote={2} />
      </div>
    </>
  )
}

export default App
