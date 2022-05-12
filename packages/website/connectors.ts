import { CoinbaseWallet } from '@web3-react/coinbase-wallet'
import { MetaMask } from '@web3-react/metamask'
import { WalletConnect } from '@web3-react/walletconnect'
import { prepareConnectors } from 'w3r-modal'

const ETH_RPC = 'https://cloudflare-eth.com'

export const connectors = prepareConnectors(
  [
    MetaMask,
    [
      CoinbaseWallet as any,
      {
        url: ETH_RPC,
        appName: 'w3r-modal'
      }
    ],
    [WalletConnect, { rpc: { 1: ETH_RPC } }]
  ],
  [1]
)
