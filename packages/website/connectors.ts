import { MetaMask } from '@web3-react/metamask'
import { WalletConnect } from '@web3-react/walletconnect'
import { prepareConnectors } from 'w3r-modal'

export const connectors = prepareConnectors(
  [MetaMask, [WalletConnect, { rpc: { 1: 'https://cloudflare-eth.com' } }]],
  [1]
)
