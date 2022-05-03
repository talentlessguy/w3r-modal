import { Modal } from 'w3r-modal'
import { useMemo } from 'react'
import * as styles from './Example.css'
import { useWalletModal } from '../hooks'
import { wallets } from '../wallets'
import { useLastWallet } from 'w3r-modal'

export function Example(props: JSX.IntrinsicElements['div']) {
  const { isConnected, isConnecting, setConnecting, connect, disconnect, address, error, ens } = useWalletModal()
  const wallet = useLastWallet((s) => s.lastWallet)

  const isInvalidNetwork = useMemo(() => {
    return error?.name === 'ChainIdNotAllowedError'
  }, [error])

  return (
    <div className={styles.column} {...props}>
      <button
        className={styles.button}
        onClick={async () => {
          if (isInvalidNetwork) {
            // @ts-ignore
            await window.ethereum?.send('wallet_switchEthereumChain', [
              {
                chainId: `0x1`
              }
            ])
          } else if (isConnected) disconnect()
          else setConnecting(true)
        }}
      >
        {isInvalidNetwork ? 'switch to ethereum' : isConnected ? 'disconnect' : 'connect'}
      </button>

      {address ? (
        <div className={styles.preview}>
          <span className={styles.address}>{ens || address?.slice(0, 8)}</span>
          <div className={styles.wallet}>
            <img height={14} width={14} src={wallet.logoURI} alt={`${wallet.name} logo`} /> {wallet.name}
          </div>
        </div>
      ) : null}

      {isConnecting ? <Modal {...{ isConnecting, setConnecting, connect, wallets }} /> : null}
    </div>
  )
}
