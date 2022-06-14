import React from 'react'
import { useButton } from '@react-aria/button'
import type { AriaButtonProps } from '@react-types/button'
import { styled } from '@stitches/react'
import Ripple from '../ripple'
import useDrip from '../hooks/useDrip'

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

const StyledButton = styled('button', {
  position: 'relative',
  overflow: 'hidden',
  variants: {
    size: {
      small: {
        padding: 10,
      },
      large: {
        padding: 20,
      },
    },
  },
})

const Button: React.FC<Props> = (props) => {
  const {
    as: elementType = 'button',
    loading,
    disabled,
    size,
    onClick,
    ...rest
  } = props

  let buttonRef = React.useRef()

  const { onClick: onDripClickHandler, ...dripBindings } = useDrip({
    ref: buttonRef,
  })

  const handleClick = (e: any) => {
    onDripClickHandler(e)
    onClick?.(e)
  }

  let { buttonProps } = useButton(
    {
      ...rest,
      onClick: handleClick,
      elementType,
    } as AriaButtonProps,
    buttonRef,
  )

  return (
    <StyledButton
      as={elementType}
      size={size}
      ref={buttonRef}
      {...buttonProps}
      disabled={loading || disabled}
    >
      {props.children}

      <Ripple {...dripBindings} />
    </StyledButton>
  )
}

export default Button
