import { useEffect } from 'react'

export default function useClickAway(args: {
  ref: React.MutableRefObject<HTMLElement>
  callback: () => void
}) {
  const { ref, callback } = args

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}
