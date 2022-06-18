import React, { useEffect, useState } from 'react'
import withDefault from './with-default'

interface Props {
  visible: boolean
  leaveTime?: number
}

const defaultProps: Props = {
  visible: true,
  leaveTime: 90,
}

const CssTransition: React.FC<Props> = (props) => {
  const { visible, leaveTime, children } = props

  const [show, setShow] = useState(visible)

  useEffect(() => {
    const time = leaveTime

    if (visible && !show) {
      setShow(true)
    }

    const timer = setTimeout(() => {
      if (!visible) {
        setShow(false)
      }

      clearTimeout(timer)
    }, time)

    return () => {
      clearTimeout(timer)
    }
  }, [visible, show])

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
      }}
    >
      {children}
    </div>
  )
}

export default withDefault(CssTransition, defaultProps)
