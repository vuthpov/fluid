import React, { useEffect, useRef } from 'react'
import { ReactComponent as Clear } from '../svg/clear.svg'
import { styled } from '../theme/stitches.config'

const StyledClear = styled(Clear, {
  position: 'absolute',
  right: 0,
  zIndex: 1,
  top: 0,
  height: '100%',
  marginTop: 'auto',
  marginBottom: 'auto',
  cursor: 'pointer',
})

type Props = React.SVGProps<SVGSVGElement> & {
  inputRef: React.MutableRefObject<HTMLInputElement>
  clearVisible: boolean
}

const ClearButton: React.FC<Props> = (props) => {
  const { inputRef, clearVisible, ...rest } = props
  const clearRef = useRef<SVGSVGElement>()

  useEffect(() => {
    inputRef.current.style.paddingRight =
      clearRef.current.getBBox().width + 'px'
  }, [])

  useEffect(() => {
    clearRef.current.style.display = clearVisible ? 'block' : 'none'
  }, [clearVisible])

  return <StyledClear {...rest} ref={clearRef} />
}

export default ClearButton
