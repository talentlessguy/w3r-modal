import { initializeConnector, Web3ReactHooks } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { Connector, ProviderRpcError, RequestArguments } from '@web3-react/types'
import { WalletConnect } from '@web3-react/walletconnect'
import { Wallet } from './src/utils/wallets'
import { JSDOM } from 'jsdom'
import { EventEmitter } from 'node:events'

export const MOCK_ADDRESS = '0x0000000000000000000000000000000000000000'

globalThis.IS_REACT_ACT_ENVIRONMENT = true

const { window } = new JSDOM('')

export class MockEIP1193Provider extends EventEmitter {
  chainId: string
  accounts?: string[]

  eth_chainId = (chainId: string) => (this.chainId = chainId)
  eth_accounts = (accounts: string[]) => this.accounts
  eth_requestAccounts = (accounts: string[]) => (this.accounts = accounts)

  request(x: RequestArguments): Promise<unknown> {
    // make sure to throw if we're "not connected"
    if (!this.chainId) return Promise.reject(new Error())

    switch (x.method) {
      case 'eth_chainId':
        return Promise.resolve(this.eth_chainId(this.chainId))
      case 'eth_accounts':
        return Promise.resolve(this.eth_accounts(this.accounts))
      case 'eth_requestAccounts':
        return Promise.resolve(this.eth_requestAccounts(this.accounts))
      case 'wallet_switchEthereumChain':
        const chainId = x.params[0].chainId.slice(2)
        this.chainId = chainId
        this.emitChainChanged(x.params[0].chainId.slice(2))
        return Promise.resolve()
      default:
        throw new Error(`Unknown RPC method: ${x.method}`)
    }
  }

  emitConnect(chainId: string) {
    this.emit('connect', { chainId })
  }

  emitDisconnect(error: ProviderRpcError) {
    this.emit('disconnect', error)
  }

  emitChainChanged(chainId: string) {
    this.emit('chainChanged', chainId)
  }

  emitAccountsChanged(accounts: string[]) {
    this.emit('accountsChanged', accounts)
  }
  isMetaMask = true
}

export function setup() {
  // @ts-ignore
  global.window = window
  global.window.ethereum = new MockEIP1193Provider()
  global.document = window.document
  global.navigator = window.navigator
  global.getComputedStyle = window.getComputedStyle
  global.requestAnimationFrame = null
}

export function reset() {
  window.ethereum = undefined
  window.document.title = ''
  window.document.head.innerHTML = ''
  window.document.body.innerHTML = ''
  window.ethereum = undefined
}

const [metaMask, metaMaskHooks] = initializeConnector<MetaMask>((actions) => new MetaMask(actions), [1])

const [walletConnect, walletConnectHooks] = initializeConnector<WalletConnect>(
  (actions) =>
    new WalletConnect(actions, {
      rpc: {
        1: 'https://cloudflare-eth.com'
      }
    }),
  [1]
)

const connectors: [Connector, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks]
]

export const wallets: Wallet[] = [
  {
    name: 'MetaMask',
    connector: connectors[0]
  },
  {
    name: 'WalletConnect',
    connector: connectors[1]
  }
]
