import { AriaLinkOptions, useLink } from '@react-aria/link'
import React from 'react'
import { styled } from '../theme/stitches.config'
interface Props extends  AriaLinkOptions{
   href?:string,
   target?:string
}

const StyleLink=styled(`a`,{
    color:'$gray600',
    textDecoration:'none',
}
)

const Link:React.FC<Props> = (props) => {
    let ref=React.useRef()
    let {href,target, ...rest}=props
    let {linkProps,isPressed}=useLink({...rest},ref)
  return (
    <StyleLink
        {...linkProps}
        ref={ref}
        href={props.href}
        target={props.target}
    >
        {props.children}
    </StyleLink>
  )
}

export default Link