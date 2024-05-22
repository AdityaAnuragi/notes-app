import note from "./NoteInHomePage.module.css"

function NoteInHomePage() {
  // const value = "first\nsecond\nthird\nfourth\nfifth"
  // const value = "first second third fourth fifth"
  const value = "Lorem ipsum dolor sit, amet consectetur adipisicing elit\nLorem ipsum dolor sit, amet consectetur adipisicing elit\nLorem ipsum dolor sit, amet consectetur adipisicing elit"
  return (
    <>
      <div className={note.container}>
        {value}
      </div>
      <br />
    </>
  )
}

export {
  NoteInHomePage
}