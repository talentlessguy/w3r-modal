import { Wallet } from 'w3r-modal'
import { connectors } from './connectors'

export const wallets: Wallet[] = [
  {
    name: 'MetaMask',
    connector: connectors[0],
    logoURI: 'https://www.genie.xyz/logos/metamask.png'
  },
  {
    name: 'WalletConnect',
    connector: connectors[2],
    logoURI: 'https://www.genie.xyz/logos/wc.png'
  },
  {
    name: 'Coinbase',
    connector: connectors[1],
    logoURI: 'https://www.genie.xyz/logos/walletlink.png'
  }
]
