import { renderHook, act } from '@testing-library/react-hooks'

import useToggle from '../../src/hooks/useToggle'

describe('Testing useToggle', () => {
  it('should be false initially', () => {
    const { result } = renderHook(() => useToggle())

    expect(result.current[0]).toBe(false)
  })

  it('should be true after toggling once', () => {
    const { result } = renderHook(() => useToggle())

    act(() => {
      result.current[1]()
    })

    expect(result.current[0]).toBe(true)
  })

  it('should reset to updated initial value', async () => {
    const { result, rerender } = renderHook(
      ({ initialValue }) => useToggle(initialValue),
      {
        initialProps: {
          initialValue: false,
        },
      }
    )

    rerender({ initialValue: true })

    act(() => {
      result.current[1]()
    })
    expect(result.current[0]).not.toBe(true)
    expect(result.current[0]).toBe(false)
  })
})
