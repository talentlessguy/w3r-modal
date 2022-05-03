import { globalStyle, style } from '@vanilla-extract/css'

export const main = style({
  display: 'flex',
  minHeight: 'calc(100vh - 104px)',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column'
})

export const caption = style({ color: '#808593', marginBottom: '12px', fontSize: '16px' })

globalStyle(`body`, {
  background: 'linear-gradient(113.85deg, #F7F9FD 50.58%, #EFF5FD 87.16%)'
})

export const h1 = style({
  color: '#212226',
  fontSize: '72px',
  marginBottom: '8px',
  marginTop: 0,
  textAlign: 'center'
})

export const linkRow = style({ display: 'flex', flexDirection: 'row', gap: '24px', marginTop: '40px' })

export const docsLink = style({
  paddingTop: '16px',
  paddingBottom: '16px',
  paddingLeft: '32px',
  paddingRight: '32px',
  borderRadius: '8px',
  textTransform: 'uppercase',
  color: 'white',
  background: 'black',
  height: 'max-content',
  boxShadow: '0px 5px 30px rgba(154, 154, 154, 0.2)',
  transition: '250ms',
  textDecoration: 'none',
  fontWeight: 'bold',
  ':hover': {
    boxShadow: '0px 29px 40px rgba(92, 92, 92, 0.33)'
  }
})

export const feature = style({
  padding: '20px',
  borderRadius: '8px',
  background: 'rgba(191, 175, 225, 0.25)',
  backdropFilter: 'blur(5px)',
  color: '#484B53',
  fontSize: '16px',
  width: '312px'
})

export const featureGrid = style({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: '36px',
  marginTop: '64px',
  justifyContent: 'center'
})

globalStyle(`${feature} > h2`, {
  marginTop: 0,
  marginBottom: '10px'
})

globalStyle(`${feature} > p`, {
  margin: 0
})
