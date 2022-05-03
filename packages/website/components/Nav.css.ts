import { style } from '@vanilla-extract/css'

export const nav = style({
  paddingLeft: '16px',
  paddingTop: '8px',
  paddingBottom: '8px',
  position: 'sticky',
  top: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '32px',
  boxShadow: '0px 10px 40px rgba(245, 103, 160, 0.25)',
  background: 'white',
  marginBottom: '36px',
  zIndex: 2
})

export const logo = style({
  transition: '100ms',
  willChange: 'transform',
  transform: 'scale(1)',
  ':hover': {
    transform: 'scale(1.125)'
  }
})

export const link = style({
  color: '#212226',
  textDecoration: 'none',
  transition: '250ms',
  ':hover': {
    color: '#808593',
    textDecoration: 'underline'
  }
})
