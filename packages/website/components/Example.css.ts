import { style } from '@vanilla-extract/css'

export const button = style({
  backgroundImage: 'radial-gradient(81.4% 279.84% at 90.91% 55.83%, #F0598F 0%, #FF80BD 50.9%, #F274A2 90.62%)',
  paddingTop: '16px',
  paddingBottom: '16px',
  paddingLeft: '32px',
  paddingRight: '32px',
  borderRadius: '8px',
  boxShadow: '0px 10px 40px rgba(245, 103, 160, 0.25)',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  transition: '250ms',
  fontSize: '16px',
  ':hover': {
    boxShadow: '0px 20px 40px rgba(245, 103, 160, 0.3)'
  }
})

export const preview = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
  boxShadow: '0px 10px 40px rgba(245, 103, 160, 0.25)',
  width: '100%',
  borderRadius: '8px',
  boxSizing: 'border-box',
  background: 'white'
})

export const address = style({
  fontSize: '18px',
  fontWeight: 'bold'
})

export const wallet = style({
  fontSize: '14',
  color: '#808593',
  marginTop: '8px'
})

export const column = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '16px'
})
