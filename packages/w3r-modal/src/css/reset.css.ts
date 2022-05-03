import { style } from '@vanilla-extract/css'

import 'focus-visible'

const hideFocusRingsDataAttribute = '[data-js-focus-visible] &:focus:not([data-focus-visible-added])'

export const base = style({
  border: 0,
  boxSizing: 'border-box',
  fontSize: '100%',
  margin: 0,
  padding: 0,
  selectors: {
    [`${hideFocusRingsDataAttribute}`]: {
      outline: 'none'
    }
  },
  verticalAlign: 'baseline',
  WebkitTapHighlightColor: 'transparent'
})

const list = style({
  listStyle: 'none'
})

const appearance = style({
  appearance: 'none'
})

const field = style([
  appearance,
  {
    '::placeholder': {
      opacity: 1
    },
    outline: 'none'
  }
])

const mark = style({
  backgroundColor: 'transparent',
  color: 'inherit'
})

const select = style([
  field,
  {
    ':disabled': {
      opacity: 1
    },
    selectors: {
      '&::-ms-expand': {
        display: 'none'
      }
    }
  }
])

const input = style([
  field,
  {
    selectors: {
      '&::-ms-clear': {
        display: 'none'
      },
      '&::-webkit-search-cancel-button': {
        WebkitAppearance: 'none'
      }
    }
  }
])

const button = style({
  background: 'none',
  cursor: 'pointer'
})

const a = style({
  color: 'inherit',
  textDecoration: 'none'
})

export const element = {
  a,
  button,
  input,
  mark,
  ol: list,
  select,
  textarea: field,
  ul: list
}
