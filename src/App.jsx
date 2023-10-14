import { useState } from "react"

function App() {

  const [data, setData] = useState([
    { category: { isCheckBox: false, isChecked: false } , data: "first word\nsecond word"},
    { category: { isCheckBox: true, isChecked: false } , data: "This is a checkbox" },
    { category: { isCheckBox: true, isChecked: true } , data: "This is the second checkbox" },
    { category: { isCheckBox: false, isChecked: false } , data: "First line\nSecond line"}
  ])

  function handleTextChange(e, index) {
    const duplicate = JSON.parse(JSON.stringify(data))
    duplicate[index].data = e.target.value
    console.log(window.getComputedStyle(e.target).getPropertyValue("height"))
    setData(duplicate)
  }

  function handleCheckChange(index) {
    const duplicate = JSON.parse(JSON.stringify(data))
    duplicate[index].category.isChecked = !(duplicate[index].category.isChecked)
    setData(duplicate)
  }

  function getStyles(index) {
    return {
      color: data[index].category.isChecked ? "grey" : "black",
      textDecoration: data[index].category.isChecked ? "line-through" : "none",
      margin: "0px",
      height : "auto",
      // lineHeight : "16px"
    }
  }

  return (
    <>
      {data.map((element, index) => {
        if (element.category.isCheckBox) {
          return (
            <div key={index} style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start" }} >
              <input type="checkbox" checked={data[index].category.isChecked} onChange={() => handleCheckChange(index)} />
              <textarea style={getStyles(index)} value={data[index].data} onChange={(e) => handleTextChange(e,index)} />
            </div>
          )
        }
        return <textarea key={index} value={data[index].data} onChange={(e) => handleTextChange(e,index)} />
      })}
    </>
  )

}

export default App
