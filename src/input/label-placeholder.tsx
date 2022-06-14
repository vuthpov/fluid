import React from 'react'
import { styled } from '../theme/stitches.config'

const StyledLabelPlaceHolder = styled(`label`, {
  position: 'absolute',
  color: '$gray600',
  fontSize: '$xs',
  zIndex: 2,
  left: 6,
  top: 20,
  cursor: 'auto',

  '&.input-focus': {
    top: 0,
    left: 0,
    cursor: 'default',
  },
})

const PlaceHolderGap = styled(`div`, {
  height: `$xs`,
})

interface Props
  extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {}

const LabelPlaceHolder = React.forwardRef<HTMLLabelElement, Props>(
  (props, ref) => {
    return (
      <>
        <PlaceHolderGap />
        <StyledLabelPlaceHolder {...(props as any)} ref={ref} />
      </>
    )
  },
)

export default LabelPlaceHolder
