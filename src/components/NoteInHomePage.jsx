import { CheckboxAndTextPairInHomePageNote } from "./CheckboxAndTextPairInHomePageNote";
import styles from "./NoteInHomePage.module.css"

export function NoteInHomePage({elementsInHomeNote = 3}) {
  const arr = []

  for(let i = 1 ; i <= elementsInHomeNote ; i++) {
    arr.push(<CheckboxAndTextPairInHomePageNote key={i} />)
  }

  return (
    <>
      <div className={styles.container} >
        {arr}
      </div>
    </>
  )
}