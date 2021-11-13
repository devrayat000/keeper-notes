import { useCallback, useEffect, useState } from 'react'

const useToggle = (
  initialState: boolean = false
): [boolean, () => void, (newState: boolean) => void] => {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    setState(initialState)
  }, [initialState])

  const toggle = useCallback(() => {
    setState(prev => !prev)
  }, [])

  const set = useCallback((newState: boolean) => {
    setState(newState)
  }, [])

  return [state, toggle, set]
}

export default useToggle
