import { globalStyle } from '@vanilla-extract/css'

globalStyle(`body`, {
  margin: '0',
  color: '#38393e',
  fontFamily: 'Chivo, sans-serif',
  backgroundColor: '#F7F9FD',
  minHeight: '100vh'
})

globalStyle('img', {
  boxShadow: '0px 5px 30px rgba(154, 154, 154, 0.2)'
})

globalStyle(`button`, {
  fontFamily: 'Chivo, sans-serif'
})
