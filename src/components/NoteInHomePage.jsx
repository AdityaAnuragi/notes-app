import note from "./NoteInHomePage.module.css"

import { Text } from "@mantine/core"

const placeholderText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores quibusdam reiciendis ipsa est, aliquid illo iste esse qui eum dicta?"

function NoteInHomePage({ lineClamp = 3, size = "xl", value = placeholderText }) {
  return (
    <>
      <div className={`${note.textContainer}`} >

        <input type="checkbox" className={note.myCheckbox} />

        <Text lineClamp={lineClamp} size={size} >
          {value}
        </Text>
      </div>
    </>
  )
}

export {
  NoteInHomePage
}