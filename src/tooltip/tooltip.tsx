import React, { useRef, useState } from 'react'
import { useTooltip, useTooltipTrigger } from '@react-aria/tooltip'
import { mergeProps } from '@react-aria/utils'
import { useTooltipTriggerState } from '@react-stately/tooltip'
import { TooltipTriggerProps } from '@react-types/tooltip'
import CssTransition from '../utils/css-transition'
import genId from '../utils/genId'
import { styled } from '../theme/stitches.config'
import {
  Offset,
  PlacementType,
  placementOffset,
  parentOffset,
  generateOffset,
} from './placement'
import withDefault from '../utils/with-default'
import useClickAway from '../hooks/useClickAway'

const Tooltip = ({ state, visible, style, ...props }) => {
  let { tooltipProps } = useTooltip(props, state)

  return (
    <CssTransition visible={visible} leaveTime={90}>
      <span
        {...mergeProps(props, tooltipProps)}
        style={{
          position: 'absolute',
          top: style.top,
          zIndex: 2,
          bottom: style.bottom,
          left: style.left,
          right: style.right,
          height: 'fit-content',
          width: 'fit-content',
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
  placement?: PlacementType
  offset?: Offset
}

type ToolTipProps = Props & ToolTipAria

const StyledTrigger = styled(`span`, {
  position: 'relative',
})

const defaultProps: Partial<Props> = {
  trigger: 'hover',
  offset: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  placement: 'top',
}

const Wrapper = React.forwardRef((props: ToolTipProps, ref) => {
  const {
    children,
    content,
    trigger,
    placement,
    offset: _offset,
    ...rest
  } = props

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

  const [offset, setOffset] = useState<Offset>({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  })

  const changeVisible = (nextVisible) => {
    if (nextVisible) {
      setOffset(
        generateOffset({
          initial: placementOffset[placement](_offset),
          offset: parentOffset[placement](tooltipRef.current),
        }),
      )
    }

    setVisible(nextVisible)
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

  useClickAway({
    ref: tooltipRef,
    callback: () => {
      if (trigger == 'click') {
        changeVisible(false)
      }
    },
  })

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

      <Tooltip
        state={state}
        {...tooltipProps}
        visible={state.isOpen}
        style={offset}
      >
        {content}
      </Tooltip>
    </StyledTrigger>
  )
})

export default withDefault(Wrapper, defaultProps)
