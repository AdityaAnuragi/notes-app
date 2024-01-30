import { forwardRef } from 'react'

const MyToolTipButton = forwardRef((props,ref) => {
  return (
    <button ref={ref} {...props} >
      {props.children}
    </button>
  )
})

export {
  MyToolTipButton
}