import { useRef } from "react"

export default function useThrottle(minWait = 300,immediateReturn) {
  const previouslyThrottledAt = useRef(0)
  if(immediateReturn) {
    console.log("Immeadiately returning")
    return false
  }
  // console.log(`inside useThrottle, ${Date.now() - previouslyThrottledAt.current} ${Date.now() - previouslyThrottledAt.current >= minWait}`)
  if ((Date.now() - previouslyThrottledAt.current) >= minWait) {
    previouslyThrottledAt.current = Date.now()
    return true
  }
  return false

}