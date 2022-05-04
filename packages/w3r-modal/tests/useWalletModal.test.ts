import { suite } from 'uvu'
import * as assert from 'assert/strict'
import { act, renderHook } from '@testing-library/react'
import { MOCK_ADDRESS, wallets, setup, reset, MockEIP1193Provider } from '../testUtils'
import { initWalletHooks } from '../src/useWalletModal'

const { useWalletModal } = initWalletHooks({ wallets })

const t = suite('useWalletModal')

t.before(setup)
t.after(reset)

t('Set "isConnecting" to false after connected and state gets filled', async () => {
  const { result } = renderHook(() => useWalletModal())

  const web3 = window.ethereum as MockEIP1193Provider
  web3.eth_chainId('0x1')

  act(() => {
    result.current.setConnecting(true)
  })

  assert.equal(result.current.isConnecting, true)

  web3.eth_requestAccounts([MOCK_ADDRESS])

  await act(async () => {
    await result.current.connect(wallets[0], { chainId: 1 })
  })

  assert.equal(result.current.address, MOCK_ADDRESS, 'address')
  assert.equal(result.current.chainId, 1, 'chainId')
  assert.equal(result.current.isConnected, true, 'isConnected')
  assert.equal(result.current.isConnecting, false, 'isConnecting')

  await act(async () => {
    await result.current.disconnect()
  })
})

t.run()
