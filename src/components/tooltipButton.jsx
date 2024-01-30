function MyToolTipButton(props) {
  return (
    <button {...props} >
      {props.children}
    </button>
  )
}

export {
  MyToolTipButton
}