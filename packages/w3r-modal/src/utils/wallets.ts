import { Web3ReactHooks } from '@web3-react/core'
import { Connector } from '@web3-react/types'

export type Wallet = {
  name: string
  connector: [Connector, Web3ReactHooks]
  logoURI?: string
}
