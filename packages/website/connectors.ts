import { initializeConnector } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { WalletConnect } from '@web3-react/walletconnect'
import type { Connector } from '@web3-react/types'
import type { Web3ReactHooks } from '@web3-react/core'

export const [metaMask, metaMaskHooks] = initializeConnector<MetaMask>((actions) => new MetaMask(actions), [1])

export const [walletConnect, walletConnectHooks] = initializeConnector<WalletConnect>(
  (actions) =>
    new WalletConnect(actions, {
      rpc: {
        1: 'https://cloudflare-eth.com'
      }
    }),
  [1]
)

export const connectors: [Connector, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks]
]
