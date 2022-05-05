import { renderHook } from '@testing-library/react'
import { MockEIP1193Provider, MOCK_ADDRESS, reset, setup, wallets } from '../testUtils'
import { initWalletHooks } from '../src/useWalletModal'
import { suite } from 'uvu'
import * as assert from 'assert/strict'

const { useWeb3State } = initWalletHooks({ wallets })

let t = suite('useWeb3State')

t.before(setup)
t.after(reset)

t('should have empty state if not connected yet', () => {
  const { result } = renderHook(() => useWeb3State())

  assert.equal(result.current.address, undefined)
  assert.equal(result.current.chainId, undefined)
  assert.equal(result.current.isConnected, false)
})

t('should have fullfilled state after activation and reset state after deactivation', async () => {
  const { result } = renderHook(() => useWeb3State())

  const web3 = window.ethereum as MockEIP1193Provider

  web3.eth_requestAccounts([MOCK_ADDRESS])

  await result.current.connector.activate({ chainId: 1 })

  assert.equal(result.current.address, MOCK_ADDRESS)
  assert.equal(result.current.chainId, 1)
  assert.equal(result.current.isConnected, true)

  await result.current.disconnect()

  assert.equal(result.current.address, undefined)
  assert.equal(result.current.chainId, undefined)
  assert.equal(result.current.isConnected, false)
})

t.run()
