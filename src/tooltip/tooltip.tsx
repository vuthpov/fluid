import React, { useEffect, useRef, useState } from 'react'
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
  offsetOutOfBound,
} from './placement'
import withDefault from '../utils/with-default'
import useClickAway from '../hooks/useClickAway'

const Tooltip = ({ state, visible, placement, offset: _offset, ...props }) => {
  let { tooltipProps } = useTooltip(props, state)
  const tooltipRef = useRef<HTMLSpanElement>()

  useEffect(() => {
    if (!visible || !tooltipRef.current) {
      return
    }

    let offset = generateOffset({
      initial: placementOffset[placement](_offset),
      offset: parentOffset[placement](tooltipRef.current),
    })

    const changeOffset = (offset: Offset) => {
      tooltipRef.current.style.top = offset.top + 'px'
      tooltipRef.current.style.left = offset.left + 'px'
      tooltipRef.current.style.right = offset.right + 'px'
      tooltipRef.current.style.bottom = offset.bottom + 'px'
    }

    tooltipRef.current.style.opacity = '0'
    changeOffset(offset)

    const tooltipRect = tooltipRef.current.getBoundingClientRect()

    const { outOfBound, opposite } = offsetOutOfBound[placement](tooltipRect)

    if (outOfBound) {
      const oppsiteOffset = generateOffset({
        initial: placementOffset[opposite](_offset),
        offset: parentOffset[opposite](tooltipRef.current),
      })

      changeOffset(oppsiteOffset)
    }

    tooltipRef.current.style.opacity = '1'
  }, [visible, placement])

  return (
    <CssTransition visible={visible} leaveTime={90}>
      <span
        {...mergeProps(props, tooltipProps)}
        style={{
          position: 'absolute',
          zIndex: 2,
          height: 'fit-content',
          width: 'fit-content',
        }}
        ref={tooltipRef}
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
  tooltipContentProps?: any
  [index: string]: any
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
    tooltipContentProps,
    ...rest
  } = props

  const tooltipRef = useRef<HTMLElement>()

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

  const changeVisible = (nextVisible) => {
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
      {...rest}
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
        {...tooltipContentProps}
        placement={placement}
        visible={state.isOpen}
        offset={_offset}
      >
        {content}
      </Tooltip>
    </StyledTrigger>
  )
})

export default withDefault(Wrapper, defaultProps)
