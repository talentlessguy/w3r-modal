import { initializeConnector, Web3ReactHooks } from '@web3-react/core'
import type { Actions, Connector } from '@web3-react/types'

export type Wallet = {
  name: string
  connector: [Connector, Web3ReactHooks]
  logoURI?: string
}

type ConnectorCtor = new (actions: Actions, ...args: unknown[]) => Connector

/**
 *
 * @param connectors array of connectors or arrays of connector and options
 * @param allowedChainIds allow only certain networks
 * @returns initialized connectors
 */
export const prepareConnectors = <T extends ConnectorCtor | [ConnectorCtor, Record<string, unknown>]>(
  connectors: T[],
  allowedChainIds?: number[]
): [Connector, Web3ReactHooks][] => {
  return connectors.map((ConnectorClass) => {
    const [connector, hooks] = initializeConnector(
      (actions) =>
        Array.isArray(ConnectorClass)
          ? new ConnectorClass[0](actions, ConnectorClass[1])
          : new (ConnectorClass as ConnectorCtor)(actions),
      allowedChainIds
    )
    return [connector, hooks]
  })
}
