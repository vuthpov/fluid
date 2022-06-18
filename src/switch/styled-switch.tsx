import { styled } from '../theme/stitches.config'

export const StyledSwitch = styled('label', {
  width: 60,
  height: 30,
  background: '$gray400',
  position: 'relative',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  transition: '$default',

  '&.on': {
    background: '$primary',
  },

  '&.focus::before': {
    content: '',
    display: 'block',
    border: `1px solid $primary`,
    width: 'calc(100% + 5px)',
    height: 'calc(100% + 5px)',
    position: 'absolute',
    left: -3,
  },
})

export const Slider = styled('span', {
  background: '$loContrast',
  height: 'calc(100% - 8px)',
  width: 'calc(50% - 4px)',
  transform: `translateX(4px)`,
  display: 'block',
  transition: '$default',

  '&.on': {
    left: `unset`,
    transform: `translateX(calc(100% + 4px))`,
  },
})
