import React, { useImperativeHandle, useRef, useState } from 'react'
import { useTooltip, useTooltipTrigger } from '@react-aria/tooltip'
import { mergeProps } from '@react-aria/utils'
import { useTooltipTriggerState } from '@react-stately/tooltip'
import { TooltipTriggerProps } from '@react-types/tooltip'
import CssTransition from '../utils/css-transition'

const Tooltip = ({ state, visible, ...props }) => {
  let { tooltipProps } = useTooltip(props, state)

  return (
    <CssTransition visible={visible} leaveTime={90}>
      <span
        {...mergeProps(props, tooltipProps)}
        style={{
          position: 'absolute',
          top: 'calc(100% + 10px)',
          color: 'black',
          left: 0,
        }}
      >
        {props.children}
      </span>
    </CssTransition>
  )
}

type TriggerType = 'hover' | 'click'

type ToolTipAria = Omit<TooltipTriggerProps, 'isOpen' | 'trigger'>

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > {
  content: React.ReactNode
  trigger?: TriggerType
  children: React.ReactNode
}

type ToolTipProps = Props & ToolTipAria

const Wrapper = React.forwardRef((props: ToolTipProps, ref) => {
  const { children, content, trigger = 'hover', ...rest } = props

  const tooltipRef = useRef()

  const [visible, setVisible] = useState(false)

  let state = useTooltipTriggerState({
    ...rest,
    isOpen: visible,
  })

  let { triggerProps, tooltipProps } = useTooltipTrigger(
    {
      ...rest,
    },
    state,
    tooltipRef,
  )

  const changeVisible = (visible) => {
    setVisible(visible)
  }

  const onMouseEnter = (e) => {
    changeVisible(true)
    props.onMouseEnter?.(e)
  }

  const onMouseLeave = (e) => {
    changeVisible(false)
    props.onMouseLeave?.(e)
  }

  const onClick = (e) => {
    changeVisible(true)
    props.onClick?.(e)
  }

  return (
    <span
      {...triggerProps}
      style={{ position: 'relative', userSelect: 'auto' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      ref={tooltipRef}
    >
      {children}

      <Tooltip state={state} {...tooltipProps} visible={state.isOpen}>
        {content}
      </Tooltip>
    </span>
  )
})

export default Wrapper
