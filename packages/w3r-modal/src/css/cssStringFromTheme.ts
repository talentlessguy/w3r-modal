import { assignInlineVars } from '@vanilla-extract/dynamic'
import { Theme } from './sprinkles.css'
import { themeVars } from './sprinkles.css'

export function cssStringFromTheme(theme: Theme) {
  return Object.entries(assignInlineVars(themeVars, theme))
    .map(([key, value]) => `${key}:${value};`)
    .join('')
}
