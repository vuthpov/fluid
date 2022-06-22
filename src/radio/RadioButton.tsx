import { useRadio } from '@react-aria/radio'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { AriaRadioProps } from '@react-types/radio'
import React from 'react'
import { RadioContext } from './RadioGroup'
import Button, { Props as ButtonProps } from '../button/index'
import { useFocusRing } from '@react-aria/focus'

export interface Props extends AriaRadioProps, Omit<ButtonProps, 'value'> {}

const RadioButton: React.FC<Props> = (props) => {
  let { children, ...rest } = props
  let state = React.useContext(RadioContext)
  let ref = React.useRef(null)
  let { inputProps } = useRadio(props, state, ref)
  let { focusProps } = useFocusRing()

  let isSelected = state.selectedValue === props.value

  return (
    <label style={{ display: 'block' }} className={'base-radio'}>
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>

      <Button
        css={{
          ...rest.css,
          background: isSelected ? '$primary' : 'unset',
        }}
        onClick={(e) => {
          state.setSelectedValue(props.value)
          props.onClick?.(e)
        }}
        {...rest}
      >
        {children}
      </Button>
    </label>
  )
}

export default RadioButton
