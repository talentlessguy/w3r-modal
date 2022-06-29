import { act, renderHook } from '@testing-library/react'
import { MOCK_ADDRESS, wallets, setup, MockEIP1193Provider } from '../testUtils'
import { initWalletHooks } from '../src/useWalletModal'
import { describe, it, beforeAll, afterAll, expect } from 'vitest'

const { useWalletModal } = initWalletHooks({ wallets })

beforeAll(setup)
afterAll(setup)

describe('useWalletModal', () => {
  it('Set "isConnecting" to false after connected and state gets filled', async () => {
    const { result } = renderHook(() => useWalletModal())

    const web3 = window.ethereum as MockEIP1193Provider
    web3.eth_chainId('0x1')

    act(() => {
      result.current.setConnecting(true)
    })

    expect(result.current.isConnecting).toEqual(true)

    web3.eth_requestAccounts([MOCK_ADDRESS])

    await act(async () => {
      await result.current.connect(wallets[0], { chainId: 1 })
    })

    expect(result.current.address, 'address').toEqual(MOCK_ADDRESS)
    expect(result.current.chainId, 'chainId').toEqual(1)
    expect(result.current.isConnected, 'isConnected').toEqual(true)

    await act(async () => {
      await result.current.disconnect()
    })
  })
})
