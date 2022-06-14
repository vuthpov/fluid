import React, { useEffect, useRef } from 'react'
import { keyframes, styled } from '../theme/stitches.config'

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  x: number
  y: number
  visible: boolean
  onCompleted: () => void
}

const ripple = keyframes({
  '0%': { opacity: 1, transform: 'scale(0)' },
  '100%': { opacity: 0, transform: 'scale(10)' },
})

const StyledRipple = styled('div', {
  position: 'absolute',
  borderRadius: '50%',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  width: 100,
  height: 100,
  marginTop: -50,
  marginLeft: -50,
  animation: `${ripple} 1s`,
})

const Ripple: React.FC<Props> = (props) => {
  const { onCompleted, visible, x, y } = props
  const dripRef = useRef<HTMLDivElement>(null)
  const top = Number.isNaN(+y) ? 0 : y - 10
  const left = Number.isNaN(+x) ? 0 : x - 10

  useEffect(() => {
    if (!dripRef.current) {
      return
    }

    dripRef.current.addEventListener('animationend', onCompleted)
    return () => {
      if (!dripRef.current) return
      dripRef.current.removeEventListener('animationend', onCompleted)
    }
  })

  if (!visible) return null

  return (
    <StyledRipple
      ref={dripRef}
      style={{
        top,
        left,
      }}
    />
  )
}

export default Ripple
