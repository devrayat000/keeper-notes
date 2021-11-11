import { useCallback, useEffect, useState } from 'react'

const useToggle = (initialState: boolean = false): [boolean, () => void] => {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    setState(initialState)
  }, [initialState])

  return [
    state,
    useCallback(() => {
      setState(prev => !prev)
    }, []),
  ]
}

export default useToggle
