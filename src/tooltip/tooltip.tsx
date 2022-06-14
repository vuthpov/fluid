//@ts-nocheck
import React from 'react'
import { useTooltip, useTooltipTrigger } from '@react-aria/tooltip'
import { mergeProps } from '@react-aria/utils'
import { useTooltipTriggerState } from '@react-stately/tooltip'
import { TooltipTriggerProps } from '@react-types/tooltip'

const Tooltip = ({ state, ...props }) => {
  let { tooltipProps } = useTooltip(props, state)

  return (
    <span
      style={{
        position: 'absolute',
        left: '5px',
        top: '100%',
        marginTop: '10px',
        backgroundColor: 'white',
        color: 'black',
        padding: '5px',
      }}
      {...mergeProps(props, tooltipProps)}
    >
      {props.children}
    </span>
  )
}

interface Props extends TooltipTriggerProps {
  content: React.ReactNode
}

const Wrapper: React.FC<Props> = React.forwardRef((props) => {
  const { children, content } = props

  let state = useTooltipTriggerState(props)
  let ref = React.useRef()

  // Get props for the trigger and its tooltip
  let { triggerProps, tooltipProps } = useTooltipTrigger(props, state, ref)

  console.log(props)
  return (
    <span style={{ position: 'relative' }}>
      {React.Children.map(children, (child: any) => {
        return React.cloneElement(child, {
          ...child.props,
          ...triggerProps,
          ref,
        })
      })}

      {state.isOpen && (
        <Tooltip state={state} {...tooltipProps}>
          {content}
        </Tooltip>
      )}
    </span>
  )
})

export default Wrapper
