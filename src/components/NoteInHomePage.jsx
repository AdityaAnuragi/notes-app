import { CheckboxAndTextPairInHomePageNote } from "./CheckboxAndTextPairInHomePageNote";
import styles from "./NoteInHomePage.module.css"

export function NoteInHomePage({ completeHomePageNoteData }) {
    // for(let i = 1 ; i <= elementsInHomeNote ; i++) {
  //   arr.push(<CheckboxAndTextPairInHomePageNote key={i} />)
  // }

  // [
  //   { category: { isCheckBox: false, isChecked: false }, data: "Hold ctrl to see shortcut" },
  //   { category: { isCheckBox: true, isChecked: true }, data: "this is ticked" },
  //   { category: { isCheckBox: false, isChecked: false }, data: "regular note" }
  // ]
  
  const arr = completeHomePageNoteData.map((note,index) => {
    const {data,category} = note
    return <CheckboxAndTextPairInHomePageNote key={index} value={data} checkboxData={{hasCheckbox : category.isCheckBox, isTicked : category.isChecked}} />
  })

  return (
    <>
      <div className={styles.container} >
        {arr}
      </div>
    </>
  )
}