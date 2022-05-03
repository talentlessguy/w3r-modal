<div align="center">
  <img src="https://bafkreidnb2tkp7mtdi2a6lfk6eijvddak373dpyomiel5pvfv6qvrwewfi.ipfs.dweb.link" alt="w3r-modal" />
  <h3>w3r-modal</h3>
</div>

[![Version][v-badge-url]][npm-url] [![Downloads][dl-badge-url]][npm-url] [![GitHub Workflow Status][checks-img]][checks] [![Codecov][cov-badge-url]][cov-url]

Simple Web3 wallet modal library.

## Install

```sh
pnpm i w3r-modal react @web3-react/core @web3-react/types
```

## Example

```jsx
import { Web3ReactHooks } from '@web3-react/core'
import { Connector } from '@web3-react/types'
import { Modal, initWalletHooks } from 'w3r-modal'
import { wallets } from './wallets'

const { useWalletModal } = initWalletHooks({ wallets })

export default function Page() {
  const { isConnected, isConnecting, setConnecting, connect, disconnect, address, error, connector, chainId, ens } =
    useWalletModal()

  return (
    <>
      <button
        onClick={async () => {
          if (isConnected) disconnect()
          else setConnecting(true)
        }}
      >
        {isConnected ? 'disconnect' : 'connect'}
      </button>
      {isConnected ? (
        <p>
          Connected to {ens || address.slice(0, 8)} with {connector.constructor.name} on chain {chainId}
        </p>
      ) : null}
      {isConnecting && <Modal {...{ isConnecting, setConnecting, connect, wallets }} />}
    </>
  )
}
```

[v-badge-url]: https://img.shields.io/npm/v/w3r-modal.svg?style=for-the-badge&color=F55A5A&label=&logo=npm
[npm-url]: https://www.npmjs.com/package/w3r-modal
[cov-badge-url]: https://img.shields.io/coveralls/github/tinyhttp/w3r-modal?style=for-the-badge&color=F55A5A
[cov-url]: https://coveralls.io/github/tinyhttp/w3r-modal
[dl-badge-url]: https://img.shields.io/npm/dt/w3r-modal?style=for-the-badge&color=F55A5A
[checks]: https://app.buddy.works/v1rtl/w3r-modal/pipelines/pipeline/389131
[checks-img]: https://img.shields.io/github/checks-status/talentlessguy/w3r-modal/master?style=for-the-badge
