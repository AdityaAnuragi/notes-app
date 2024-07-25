import { CheckboxAndTextPairInHomePageNote } from "./CheckboxAndTextPairInHomePageNote";
import styles from "./NoteInHomePage.module.css"

export function NoteInHomePage({ completeHomePageNoteData }) {
  const arr = []

  // for(let i = 1 ; i <= elementsInHomeNote ; i++) {
  //   arr.push(<CheckboxAndTextPairInHomePageNote key={i} />)
  // }

  // [
  //   { category: { isCheckBox: false, isChecked: false }, data: "Hold ctrl to see shortcut" },
  //   { category: { isCheckBox: true, isChecked: true }, data: "this is ticked" },
  //   { category: { isCheckBox: false, isChecked: false }, data: "regular note" }
  // ]

  for( const note of completeHomePageNoteData ) {
    arr.push( <CheckboxAndTextPairInHomePageNote value={note.data} checkboxData={{hasCheckbox : note.category.isCheckBox,isTicked : note.category.isChecked}} /> )
  }

  return (
    <>
      <div className={styles.container} >
        {arr}
      </div>
    </>
  )
}