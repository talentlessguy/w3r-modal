import type { Wallet } from './utils'
import { useState, useEffect, useRef } from 'react'
import { getPriorityConnector } from '@web3-react/core'
import create from 'zustand'
import { persist } from 'zustand/middleware'
import type { Provider } from '@web3-react/types'

type State = {
  /**
   * Last saved wallet with name and icon
   */
  lastWallet: { name: string; logoURI?: string }
  /**
   * Save a wallet to storage
   */
  setLastWallet: (w: { name: string; logoURI?: string }) => void
  /**
   * Remove a wallet from storage
   */
  resetWallet: () => void
}

/**
 * Zustand hook with last saved wallet.
 */
export const useLastWallet = create(
  persist<State>(
    (set) => ({
      lastWallet: { name: '', logoURI: '' },
      setLastWallet: (w) => set({ lastWallet: w }),
      resetWallet: () => set({ lastWallet: { name: '', logoURI: '' } })
    }),
    { name: 'useLastWallet' }
  )
)

function useLazyEffect(fn: () => void, inputs: unknown[]) {
  const didMountRef = useRef(false)

  useEffect(() => {
    if (didMountRef.current) return fn()
    else didMountRef.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, inputs)
}

/**
 * Statically initializes `useWalletModal` and `useWeb3State` hooks
 * @param options setup options
 * @returns `useWalletModal` and `useWeb3State`
 */
export const initWalletHooks = ({
  wallets,
  autoConnect = true,
  ensProvider
}: {
  wallets: Wallet[]
  autoConnect?: boolean
  ensProvider?: Provider
}) => {
  const {
    usePriorityConnector,
    useSelectedChainId,
    useSelectedIsActivating,
    useSelectedError,
    useSelectedAccount,
    useSelectedIsActive,
    useSelectedProvider,
    useSelectedENSName
  } = getPriorityConnector(...wallets.map((c) => c.connector))

  /**
   * A React hook to access the connector state
   * @returns selected wallet connector's state
   */
  function useWeb3State() {
    const lastWallet = useLastWallet((state) => state.lastWallet)
    const resetLastWallet = useLastWallet((s) => s.resetWallet)

    useEffect(() => {
      if (autoConnect && lastWallet) {
        wallets.find((w) => w.name === lastWallet.name)?.connector[0].activate()
      }
    }, [])

    const connector = usePriorityConnector()
    const chainId = useSelectedChainId(connector)
    const error = useSelectedError(connector)
    const address = useSelectedAccount(connector)
    const isConnected = useSelectedIsActive(connector)
    const provider = useSelectedProvider(connector)
    const ens = useSelectedENSName(connector, (ensProvider as any) || provider)
    const isActivating = useSelectedIsActivating(connector)

    const disconnect = async () => {
      await connector.deactivate()
      resetLastWallet()
    }

    const web3State = {
      connector,
      chainId,
      error,
      address: address,
      provider,
      isConnected,
      ens,
      isActivating
    }

    return { ...web3State, disconnect }
  }

  /**
   * React Web3 wallet hook to manage the connection process
   * If `autoConnect` is enabled,
   * @returns modal state and selected wallet connector's state
   */
  function useWalletModal() {
    const { address, chainId, error, provider, ens, isConnected, isActivating, connector, disconnect } = useWeb3State()

    const setLastWallet = useLastWallet((state) => state.setLastWallet)

    const [isConnecting, setConnecting] = useState(false)

    const connect = async (w: Wallet, options?: unknown) => {
      setLastWallet({ name: w.name, logoURI: w.logoURI })
      await w.connector[0].activate(options)
      setConnecting(false)
    }

    useLazyEffect(() => {
      if (!isConnected && !error) {
        // clean up storage if user disconnects from metamask extension
        disconnect()
      }
    }, [isConnected])

    return {
      address,
      chainId,
      error,
      provider,
      ens,
      connect,
      disconnect,
      isConnected,
      isConnecting,
      setConnecting,
      isActivating,
      connector
    }
  }

  return { useWeb3State, useWalletModal }
}
