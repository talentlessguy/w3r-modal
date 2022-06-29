import { render, screen } from '@testing-library/react'
import { Modal } from '../src/index'
import { setup, wallets } from '../testUtils'
import { describe, expect, it } from 'vitest'
import '@vanilla-extract/css/disableRuntimeStyles'

const EmptyExample = () => {
  return <Modal wallets={wallets} isConnecting setConnecting={() => void 0} connect={() => void 0} />
}

describe('Modal', () => {
  it('should render an opened modal', async () => {
    setup()
    render(<EmptyExample />)
    const root = await screen.findByRole('dialog')
    expect(root.getAttribute('aria-labelledby')).toBe('w3r_modal')
    expect(root.getAttribute('aria-modal')).toBe('true')

    const walletEls = screen.getAllByRole('button').slice(1)

    expect(walletEls.map((w) => w.textContent)).toStrictEqual(wallets.map((w) => w.name))
  })
})
