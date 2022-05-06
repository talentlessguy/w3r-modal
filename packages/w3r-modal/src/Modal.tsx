import React, { Dispatch, useCallback, useEffect, useRef, useState } from 'react'
import { Dialog } from './Dialog'
import * as styles from './Modal.css'
import { CloseIcon } from './icons'
import { clsx } from './clsx'
import type { Wallet } from './utils'

export interface ModalProps {
  classNames?: Partial<{
    close: string
    title: string
    wallets: string
  }>
  /**
   * Connect to a wallet
   */
  connect: (w: Wallet) => Promise<void>
  isConnecting: boolean
  setConnecting: Dispatch<boolean>
  /**
   * Array of wallets with names, icons and connectors
   */
  wallets: Wallet[]
}

const WalletIcon = ({ connect, wallet }: { wallet: Wallet } & Partial<Pick<ModalProps, 'connect'>>) => {
  return (
    <li key={wallet.name}>
      <button
        className={styles.ButtonOption}
        onClick={async () => {
          await connect(wallet)
        }}
        type="button"
      >
        <div className={clsx(styles.WalletLabel)}>
          {wallet.logoURI ? (
            <img src={wallet.logoURI} title={wallet.name} className={styles.Icon} alt={wallet.name} />
          ) : null}
          {wallet.name}
        </div>
      </button>
    </li>
  )
}

/**
 * Basic Web3 Modal
 */
export const Modal = ({ classNames, connect, isConnecting, setConnecting, wallets }: ModalProps) => {
  const initialFocusRef = useRef<HTMLHeadingElement | null>(null)
  const titleId = 'w3r_modal'

  const stopConnecting = useCallback(() => setConnecting(false), [setConnecting])

  const [isMetaMaskSupported, setMetaMaskSupported] = useState(true)

  useEffect(() => {
    setMetaMaskSupported(!!(window as any).ethereum)
  }, [])

  return (
    <Dialog
      classNames={{ content: styles.dialog }}
      initialFocusRef={initialFocusRef}
      onClose={stopConnecting}
      open={isConnecting}
      titleId={titleId}
    >
      <div>
        <div className={styles.row}>
          <h1 className={clsx(styles.ModalTitle, classNames?.title)} id={titleId} ref={initialFocusRef} tabIndex={-1}>
            Connect to a wallet
          </h1>
          <button
            aria-label="Close"
            className={clsx(styles.CloseButton, classNames?.close)}
            onClick={stopConnecting}
            type="button"
          >
            <CloseIcon />
          </button>
        </div>

        <div className={clsx(styles.Wallets, classNames?.wallets)}>
          {wallets
            .filter((x) => (x.name === 'MetaMask' ? isMetaMaskSupported : true))
            .map((c) => {
              return <WalletIcon connect={connect} key={c.name} wallet={c} />
            })}
        </div>
      </div>
    </Dialog>
  )
}
