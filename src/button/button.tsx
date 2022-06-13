import React from 'react'
import { useButton } from '@react-aria/button'
import type { AriaButtonProps } from '@react-types/button'
import { styled } from '@stitches/react'

interface Props
  extends Omit<
      React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      >,
      keyof AriaButtonProps
    >,
    AriaButtonProps {
  as?: keyof JSX.IntrinsicElements
  disabled?: boolean
  loading?: boolean
  [index: string]: any
}

const StyledButton = styled('button', {})

const Button: React.FC<Props> = (props) => {
  const { as: elementType = 'button', loading, disabled, ...rest } = props

  let ref = React.useRef()
  let { buttonProps } = useButton({ ...rest, elementType }, ref)

  return (
    <StyledButton
      as={elementType}
      {...buttonProps}
      disabled={loading || disabled}
    >
      {props.children}
    </StyledButton>
  )
}

export default Button
