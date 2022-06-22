import { useRadio } from '@react-aria/radio'
import { AriaRadioProps } from '@react-types/radio'
import React from 'react'
import RadioGroup, { RadioContext } from './RadioGroup'
import RadioButton from './RadioButton'

export interface Props extends AriaRadioProps {}

const Radio = (props) => {
  let { children } = props
  let state = React.useContext(RadioContext)
  let ref = React.useRef(null)
  let { inputProps } = useRadio(props, state, ref)

  return (
    <label style={{ display: 'block' }}>
      <input {...inputProps} ref={ref} />
      {children}
    </label>
  )
}

type RadioComponent = React.FC<Props> & {
  Group: typeof RadioGroup
  Button: typeof RadioButton
}

export default Radio as RadioComponent
