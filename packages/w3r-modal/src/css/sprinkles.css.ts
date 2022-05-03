/* eslint-disable sort-keys-fix/sort-keys-fix */
import { createGlobalThemeContract } from '@vanilla-extract/css'
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles'

import './reset.css'

export const defaultTheme = {
  colors: {
    modalText: '#212226',
    modalCloseButton: '#212226',
    modalCloseButtonHover: '#808593',
    modalBackground: 'white',
    modalBackdrop: 'rgba(0, 0, 0, 0.3)'
  },
  font: 'sans-serif',
  radii: {
    modal: '8px',
    icon: '8px'
  },
  shadow: '0px 5px 30px rgba(154, 154, 154, 0.2)'
}

export type Theme = typeof defaultTheme

export const themeVars = createGlobalThemeContract(defaultTheme, (_, path) => `w3r-${path.join('-')}`)

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}
export type ThemePartial = DeepPartial<Theme>

const spacing = {
  '0': '0',
  '4': '4px',
  '10': '10px',
  '20': '20px',
  '24': '24px'
}

const dimensions = {
  '4': '4px',
  '8': '8px',
  '20': '20px',
  '24': '24px',
  '54': '54px',
  full: '100%',
  max: 'max-content',
  viewHeight: '100vh',
  viewWidth: '100vw'
}

const flexAlignment = ['flex-start', 'center'] as const

const layoutStyles = defineProperties({
  properties: {
    alignItems: flexAlignment,
    borderRadius: { ...themeVars.radii, round: '999px' },
    display: ['none', 'block', 'flex'],
    flexDirection: ['row', 'column'],
    fontFamily: { body: themeVars.font },
    fontSize: {
      '16': '16px',
      '20': '20px'
    },
    fontWeight: {
      normal: '400',
      semibold: '600',
      bold: '700'
    },
    height: dimensions,
    justifyContent: [...flexAlignment, 'space-between'],
    marginBottom: spacing,
    marginRight: spacing,
    marginTop: spacing,
    maxWidth: dimensions,
    minWidth: dimensions,
    padding: spacing,
    position: ['absolute', 'fixed', 'relative'],
    width: dimensions,
    gap: spacing
  } as const
})

const colorStyles = defineProperties({
  conditions: {
    default: {},
    hover: {
      selector: '&:hover'
    }
  },
  defaultCondition: 'default',
  properties: {
    background: themeVars.colors,
    boxShadow: { modal: themeVars.shadow },
    color: themeVars.colors
  }
})

const unresponsiveProperties = defineProperties({
  properties: {
    cursor: ['pointer']
  } as const
})

export const sprinkles = createSprinkles(layoutStyles, colorStyles, unresponsiveProperties)
export type Sprinkles = Parameters<typeof sprinkles>[0]
