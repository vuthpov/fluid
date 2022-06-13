import React from 'react'
import { AriaTextFieldOptions, useTextField } from '@react-aria/textfield'

interface Props extends AriaTextFieldOptions<'input'> {
  label?: string
}

const Input: React.FC<Props> = (props) => {
  const { label, ...rest } = props
  let ref = React.useRef()
  let {
    labelProps,
    inputProps,
    descriptionProps,
    errorMessageProps,
  } = useTextField(rest, ref)

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label {...labelProps}>{label}</label>
      <input {...inputProps} ref={ref} />
      {props.description && (
        <div {...descriptionProps}>{props.description}</div>
      )}
      {props.errorMessage && (
        <div {...errorMessageProps} style={{ color: 'red' }}>
          {props.errorMessage}
        </div>
      )}
    </div>
  )
}

export default Input
