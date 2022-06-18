import React from 'react'
import { useSwitch } from '@react-aria/switch'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { useToggleState } from '@react-stately/toggle'
import { useFocusRing } from '@react-aria/focus'
import { AriaSwitchProps } from '@react-types/switch'
import { Slider, StyledSwitch } from './styled-switch'

interface Props extends AriaSwitchProps {
  style?: React.CSSProperties
  className?: string
}

const Switch: React.FC<Props> = (props) => {
  const { style, className, ...rest } = props
  let state = useToggleState(rest)
  let ref = React.useRef()
  let { inputProps } = useSwitch(rest, state, ref)
  let { isFocusVisible, focusProps } = useFocusRing()

  let switchClassName = state.isSelected ? `on` : ''

  if (isFocusVisible) {
    switchClassName = `${switchClassName} focus`
  }

  if (className) {
    switchClassName = `${switchClassName} ${className}`
  }

  return (
    <StyledSwitch
      onClick={() => {
        const nextSelected = !state.isSelected
        props.onChange?.(nextSelected)
      }}
      style={style}
      className={switchClassName}
    >
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>

      <Slider className={state.isSelected ? 'on' : ''} />
    </StyledSwitch>
  )
}

export default Switch
