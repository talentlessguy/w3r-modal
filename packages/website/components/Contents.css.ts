import { style } from '@vanilla-extract/css'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
  width: 'max-content',
  position: 'sticky',
  top: 76,
  left: 0,
  height: 'max-content',
  '@media': {
    '(max-width: 543px)': {
      position: 'static',
      paddingTop: 0,
      paddingBottom: 0
    }
  }
})

export const ul = style({
  listStyle: 'none',
  paddingLeft: 0,
  lineHeight: 2,
  marginTop: '16px',
  marginBottom: 0
})

export const link = style({
  textDecoration: 'none',
  color: 'black',
  fontWeight: 'bold'
})

export const currentLink = style({
  color: '#808593'
})

export const contents = style({
  fontSize: '24px'
})
