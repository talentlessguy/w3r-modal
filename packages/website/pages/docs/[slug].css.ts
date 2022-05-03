import { globalStyle, style } from '@vanilla-extract/css'

globalStyle('h1', {
  fontSize: '64px',
  fontWeight: 'bolder',
  marginBottom: '24px',
  marginTop: 0
})

export const main = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '48px',
  '@media': {
    '(max-width: 543px)': {
      justifyContent: 'flex-start',
      padding: '16px',
      gap: '24px'
    }
  }
})

globalStyle(`${main} > article > code`, {
  fontSize: '12px',
  fontFamily: '"Fira Code", monospace'
})

export const article = style({
  width: '60vw',
  '@media': {
    '(max-width: 543px)': {
      width: 'calc(100vw - 32px)'
    }
  }
})

globalStyle('.shiki', {
  padding: '16px',
  overflowX: 'auto',
  fontSize: '12px',
  fontFamily: '"Fira Code", monospace',
  borderRadius: '8px'
})

globalStyle(`table`, { borderCollapse: 'collapse' })

globalStyle(`table th`, {
  textAlign: 'left',
  borderBottom: '2px solid black'
})

globalStyle(`table th, table td`, {
  paddingRight: '16px',
  paddingBottom: '8px'
})

globalStyle(`table td`, {
  paddingTop: '8px'
})

globalStyle(`h2`, {
  marginTop: '48px'
})
