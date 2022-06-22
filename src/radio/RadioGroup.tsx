import { useRadioGroup } from '@react-aria/radio'
import { RadioGroupState, useRadioGroupState } from '@react-stately/radio'
import { RadioGroupProps } from '@react-types/radio'
import React from 'react'
import Button from '../button/button'
import { styled } from '../theme/stitches.config'

export let RadioContext = React.createContext<RadioGroupState>(null)

export interface Props extends RadioGroupProps {}

const Container = styled('div', {
  display: 'flex',

  ['& > *']: {
    marginRight: 8,
  },

  [`& .base-radio`]: {
    marginRight: 0,
  },

  [`& .base-radio:not(:first-child):not(:last-child)>button`]: {
    borderLeft: `0.5px solid currentColor`,
    borderRight: `0.5px solid currentColor`,
  },

  [`& .base-radio:first-child>button`]: {
    borderRight: `0.5px solid currentColor`,
  },

  [`& .base-radio:last-child>button`]: {
    borderLeft: `0.5px solid currentColor`,
  },
})

const RadioGroup: React.FC<Props> = (props) => {
  let { children, label } = props
  let state = useRadioGroupState(props)
  let { radioGroupProps, labelProps } = useRadioGroup(props, state)
  return (
    <div {...radioGroupProps}>
      <span {...labelProps}>{label}</span>
      <RadioContext.Provider value={state}>
        <Container>{children}</Container>
      </RadioContext.Provider>
    </div>
  )
}

export default RadioGroup
