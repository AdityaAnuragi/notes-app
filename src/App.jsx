// import { useEffect, useLayoutEffect, useRef, useState } from "react"
// import "./App.css"
// import useThrottle from "./customHooks/useThrottle"
// import { TooltipButtonWrapper } from "./components/tooltipButton"
// import { OpenNote } from "./components/OpenNote"
import { CheckboxAndTextPairInHomePageNote } from "./components/CheckboxAndTextPairInHomePageNote"
function App() {
  return (
    <>
      {/* <OpenNote /> */}
      <CheckboxAndTextPairInHomePageNote />
      <CheckboxAndTextPairInHomePageNote value="hey there" checkboxData={{hasCheckbox : true , isTicked : false}} />
      <CheckboxAndTextPairInHomePageNote value="hey there" checkboxData={{hasCheckbox : false , isTicked : false}} />
      <CheckboxAndTextPairInHomePageNote value="qwertyuiopasdfghjkklzxcvbnmqwertyuiop" />
    </>
  )
}

export default App
