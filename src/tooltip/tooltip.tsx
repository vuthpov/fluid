import React, { useEffect, useRef, useState } from 'react'
import { useTooltip, useTooltipTrigger } from '@react-aria/tooltip'
import { mergeProps } from '@react-aria/utils'
import { useTooltipTriggerState } from '@react-stately/tooltip'
import { TooltipTriggerProps } from '@react-types/tooltip'
import CssTransition from '../utils/css-transition'
import genId from '../utils/genId'
import { styled } from '../theme/stitches.config'

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

const StyledTrigger = styled(`span`, {
  position: 'relative',
})

const Wrapper = React.forwardRef((props: ToolTipProps, ref) => {
  const { children, content, trigger = 'hover', ...rest } = props

  const id = genId()

  const tooltipRef = useRef<HTMLElement>(document.getElementById(id))

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

  const onMouseEnter: React.MouseEventHandler<HTMLSpanElement> = (e) => {
    if (trigger == 'hover') {
      changeVisible(true)
    }

    props.onMouseEnter?.(e)
  }

  const onMouseLeave = (e) => {
    if (trigger == 'hover') {
      changeVisible(false)
    }

    props.onMouseLeave?.(e)
  }

  const onClick = (e) => {
    if (trigger == 'click') {
      changeVisible(!visible)
    }
    props.onClick?.(e)
  }

  return (
    <StyledTrigger
      {...triggerProps}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={tooltipRef}
    >
      {React.Children.map(children, (child: any) => {
        return React.cloneElement(child, {
          ...child.props,
          onClick,
        })
      })}

      <Tooltip state={state} {...tooltipProps} visible={state.isOpen}>
        {content}
      </Tooltip>
    </StyledTrigger>
  )
})

export default Wrapper
