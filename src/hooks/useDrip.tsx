import React, { useEffect, useState } from 'react'

const useDrip = (props: { ref: React.MutableRefObject<any> }) => {
  const { ref } = props

  const [dripX, setDripX] = useState(0)
  const [dripY, setDripY] = useState(0)
  const [dripVisible, setDripVisible] = useState(false)

  const dripCompletedHandler = () => {
    setDripX(0)
    setDripY(0)
    setDripVisible(false)
  }

  const dripHandler = (event) => {
    const rect = ref.current.getBoundingClientRect()

    setDripVisible(true)
    setDripX(event.clientX - rect.left)
    setDripY(event.clientY - rect.top)
  }

  return {
    visible: dripVisible,
    x: dripX,
    y: dripY,
    onClick: dripHandler,
    onCompleted: dripCompletedHandler,
  }
}

export default useDrip
