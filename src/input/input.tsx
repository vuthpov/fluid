import React, { useImperativeHandle, useRef } from 'react'
import { AriaTextFieldOptions, useTextField } from '@react-aria/textfield'
import { styled } from '../theme/stitches.config'
import StyledLabelPlaceHolder from './label-placeholder'

interface Props extends AriaTextFieldOptions<'input'> {
  labelPlaceHolder?: string
  label?: string
}

const InputContainer = styled(`div`, {
  position: 'relative',
})

const StyledInput = styled(`input`, {
  position: 'relative',
  zIndex: 1,
})

const Container = styled(`div`, {
  display: 'flex',
  flexDirection: 'column',
  height: `calc(100% + 17px)`,
})

const Input: React.FC<Props> = React.forwardRef((props, ref) => {
  const { label, labelPlaceHolder, ...rest } = props
  let inputRef = React.useRef<HTMLInputElement>(null)

  let {
    labelProps,
    inputProps,
    descriptionProps,
    errorMessageProps,
  } = useTextField({ ...rest }, inputRef)

  useImperativeHandle(ref, () => inputRef.current)

  const labelPlaceHolderRef = useRef<HTMLLabelElement>(null)

  const onInputClick: React.MouseEventHandler<HTMLInputElement> = (e) => {
    inputProps.onClick?.(e)
    labelPlaceHolderRef.current?.classList.add('input-focus')
  }

  const onInputBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    inputProps.onBlur?.(e)
    const noValue = e.target.value.length === 0

    if (noValue) {
      labelPlaceHolderRef.current?.classList.remove('input-focus')
    }
  }

  return (
    <Container>
      {label && <label {...labelProps}>{label}</label>}
      <InputContainer>
        {labelPlaceHolder && (
          <>
            <StyledLabelPlaceHolder
              {...labelProps}
              ref={labelPlaceHolderRef}
              onClick={(e) => {
                labelProps.onClick?.(e)
                inputRef.current?.focus()
                labelPlaceHolderRef.current?.classList.add('input-focus')
              }}
            >
              {labelPlaceHolder}
            </StyledLabelPlaceHolder>
          </>
        )}

        <StyledInput
          {...inputProps}
          ref={inputRef}
          onClick={onInputClick}
          onBlur={onInputBlur}
        />
      </InputContainer>
      {props.description && (
        <div {...descriptionProps}>{props.description}</div>
      )}
      {props.errorMessage && (
        <div {...errorMessageProps} style={{ color: 'red' }}>
          {props.errorMessage}
        </div>
      )}
    </Container>
  )
})

export default Input
