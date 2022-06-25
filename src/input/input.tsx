import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { AriaTextFieldOptions, useTextField } from '@react-aria/textfield'
import { styled } from '../theme/stitches.config'
import StyledLabelPlaceHolder from './label-placeholder'
import ClearButton from './clear-button'

interface Props extends AriaTextFieldOptions<'input'> {
  labelPlaceHolder?: string
  label?: string
  allowClear?: boolean
}

const InputContainer = styled(`span`, {
  position: 'relative',
})

const StyledInput = styled(`input`, {
  position: 'relative',
  zIndex: 1,
})

const Container = styled(`span`, {
  width: 'fit-content',
  display: 'flex',
  flexDirection: 'column',
  height: `calc(100% + 17px)`,
})

const Input: React.FC<Props> = React.forwardRef((props, ref) => {
  const {
    label,
    labelPlaceHolder,
    allowClear,
    defaultValue,
    value: _value,
    onChange,
    ...rest
  } = props
  let inputRef = React.useRef<HTMLInputElement>(null)

  let [value, setValue] = useState(defaultValue || '')

  useEffect(() => {
    setValue(value)
  }, [_value])

  let {
    labelProps,
    inputProps,
    descriptionProps,
    errorMessageProps,
  } = useTextField(
    {
      ...rest,
      value,
      onChange: (value) => {
        setValue(value)
        onChange?.(value)
      },
      defaultValue,
    },
    inputRef,
  )

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

  const clearVisible = value !== ''

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

        <div
          style={{
            position: 'relative',
          }}
        >
          <StyledInput
            {...inputProps}
            ref={inputRef}
            onClick={onInputClick}
            onBlur={onInputBlur}
          />

          {allowClear && (
            <ClearButton
              clearVisible={clearVisible}
              onClick={() => {
                setValue('')
              }}
              inputRef={inputRef}
            />
          )}
        </div>
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
