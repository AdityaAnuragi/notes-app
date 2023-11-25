import { useRef } from "react"

export default function useThrottle(minWait = 300) {
  const previouslyThrottledAt = useRef(0)
  console.log(`inside useThrottle, ${Date.now() - previouslyThrottledAt.current} ${Date.now() - previouslyThrottledAt.current >= minWait}`)
  if ((Date.now() - previouslyThrottledAt.current) >= minWait) {
    previouslyThrottledAt.current = Date.now()
    return true
  }
  return false

}