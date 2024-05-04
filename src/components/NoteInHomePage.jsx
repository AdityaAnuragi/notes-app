import note from "./NoteInHomePage.module.css"

function NoteInHomePage() {
  const data = "first\nsecond\nthird\nfourth\nfifth"

  function getStringWithReducedInfo(str) {
    if(str.length > 84) {
      return str.slice(0,)
    }



    const arrOfLines = str.split("\n")
    console.log(arrOfLines)
    if(arrOfLines.length > 3) {
      return (arrOfLines.slice(0,3).join("\n")+"\n...")
    }

  }
  
  return (
    <>
      <textarea className={note.textarea} value={getStringWithReducedInfo(data)} style={{height : `${28*1.1*4}px`}} />
    </>
  )
}

export {
  NoteInHomePage
}