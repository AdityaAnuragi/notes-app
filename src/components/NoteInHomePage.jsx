import { CheckboxAndTextPairInHomePageNote } from "./CheckboxAndTextPairInHomePageNote";
import styles from "./NoteInHomePage.module.css"

export function NoteInHomePage({ completeHomePageNoteData , onClickCallback }) {
  
  const loopUpperLimit = (completeHomePageNoteData.length > 3) ? 3 : completeHomePageNoteData.length
  const arr = []
  for(let i = 0 ; i < loopUpperLimit ; i++) {
    const {data,category} = completeHomePageNoteData[i]
    arr.push(<CheckboxAndTextPairInHomePageNote key={i} value={data} checkboxData={{hasCheckbox : category.isCheckBox, isTicked : category.isChecked}} />)
  }

  return (
    <>
      <div className={styles.container} onClick={onClickCallback} >
        {arr}
        {completeHomePageNoteData.length > 3 && <h3 className={styles.unselectable} >...</h3>} 
      </div>
    </>
  )
}