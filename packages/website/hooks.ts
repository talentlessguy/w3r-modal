import { initWalletHooks } from 'w3r-modal'

import { wallets } from './wallets'

export const { useWalletModal } = initWalletHooks({ wallets })
