import { useCallback, useRef } from 'react'

/**
 *  函数防抖
 * @param {Function} fn
 * @param {number} delay
 * @returns
 */
const useDebouncedFn = (fn, delay) => {
  const timeout = useRef(null)

  return useCallback(
    (...args) => {
      clearTimeout(timeout.current)
      timeout.current = setTimeout(() => fn(...args), delay)
    },
    [fn, delay]
  )
}

export default useDebouncedFn
