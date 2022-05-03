import { style } from '@vanilla-extract/css'
import { sprinkles } from './css/sprinkles.css'

export const overlay = style([
  sprinkles({
    alignItems: 'center',
    background: 'modalBackdrop',
    display: 'flex',
    height: 'viewHeight',
    justifyContent: 'center',
    width: 'full',
    position: 'fixed'
  }),
  {
    left: 0,
    top: 0
  }
])

export const content = sprinkles({ position: 'relative' })
