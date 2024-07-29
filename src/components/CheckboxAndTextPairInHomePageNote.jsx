import note from "./CheckboxAndTextPairInHomePageNote.module.css"

import { Text } from "@mantine/core"

const placeholderText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores quibusdam reiciendis ipsa est, aliquid illo iste esse qui eum dicta?"

function CheckboxAndTextPairInHomePageNote({ lineClamp = 3, size = "xl", value = placeholderText , checkboxData = {hasCheckbox : true , isTicked : true} }) {
  
  return (
    <>
      <div className={`${note.textContainer}`} >

        {checkboxData.hasCheckbox && <input type="checkbox" checked={checkboxData.isTicked} className={`${note.myCheckbox} ${note.unselectable} `} readOnly />}

        <Text 
          lineClamp={lineClamp} 
          size={size} 
          classNames={{
            root : checkboxData.isTicked ? `${note.mantineTextRootSelector} ${note.unselectable}` : note.unselectable
          }}
        >
          {value}
        </Text>
      </div>
    </>
  )
}

export {
  CheckboxAndTextPairInHomePageNote
}