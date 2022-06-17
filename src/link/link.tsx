import { AriaLinkOptions, useLink } from '@react-aria/link'
import React from 'react'
import { styled } from '../theme/stitches.config'
interface Props
  extends Omit<
      React.DetailedHTMLProps<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
      >,
      keyof AriaLinkOptions
    >,
    AriaLinkOptions {}

const StyleLink = styled(`a`, {
  color: '$gray600',
  textDecoration: 'none',
})

const Link: React.FC<Props> = (props) => {
  let ref = React.useRef()
  let { ...rest } = props
  let { linkProps } = useLink({ ...rest }, ref)

  return (
    <StyleLink {...linkProps} ref={ref}>
      {props.children}
    </StyleLink>
  )
}

export default Link
