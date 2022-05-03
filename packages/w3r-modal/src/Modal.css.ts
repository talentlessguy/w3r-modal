import { style } from '@vanilla-extract/css'
import { sprinkles } from './css/sprinkles.css'

export const ModalTitle = style([
  sprinkles({
    color: 'modalText',
    display: 'block',
    fontFamily: 'body',
    fontSize: '20',
    fontWeight: 'normal',
    marginBottom: '0',
    marginTop: '0'
  }),
  {
    fontFeatureSettings: "'ss08' on, 'cv09' on",
    letterSpacing: '0.4px',
    lineHeight: '24px'
  }
])

export const ButtonOption = style([
  sprinkles({
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0',
    width: 'full'
  }),
  {
    background: 'none',
    border: 'none'
  }
])

export const CloseButton = style([
  sprinkles({
    color: { default: 'modalCloseButton', hover: 'modalCloseButtonHover' },
    cursor: 'pointer',
    borderRadius: 'round',
    padding: '0',
    height: '24',
    width: '24'
  }),
  {
    border: 'none',
    background: 'none',
    transition: '250ms'
  }
])

export const WalletLabel = style([
  sprinkles({
    alignItems: 'center',
    color: 'modalText',
    display: 'flex',
    fontSize: '16',
    fontWeight: 'bold',
    justifyContent: 'center'
  }),
  {
    fontFeatureSettings: "'pnum' on, 'lnum' on",
    textTransform: 'capitalize'
  }
])

export const Icon = sprinkles({
  borderRadius: 'icon',
  height: '24',
  width: '24',
  marginRight: '10'
})

export const Wallets = style([
  sprinkles({
    marginTop: '24',
    display: 'flex',
    flexDirection: 'column',
    gap: '20'
  }),
  {
    listStyleType: 'none',
    paddingLeft: 0
  }
])

export const dialog = style([
  sprinkles({
    background: 'modalBackground',
    borderRadius: 'modal',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '24',
    position: 'relative',
    width: 'max'
  }),
  {
    minWidth: '300px'
  }
])

export const row = sprinkles({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
})
