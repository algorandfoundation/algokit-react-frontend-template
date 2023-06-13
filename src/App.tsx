import { WalletProvider } from '@txnlab/use-wallet'
import { useAlgoWallet } from './hooks/useAlgoWalletProvider'
import ConnectWallet from './components/ConnectWallet'
import Transact from './components/Transact'
import { SnackbarProvider } from 'notistack'
import { useState } from 'react'

export default function App() {
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false)
  const [openDemoModal, setOpenDemoModal] = useState<boolean>(false)

  const toggleWalletModal = () => {
    setOpenWalletModal(!openWalletModal)
  }

  const toggleDemoModal = () => {
    setOpenDemoModal(!openDemoModal)
  }

  const walletProviders = useAlgoWallet({
    nodeToken: import.meta.env.VITE_ALGOD_NODE_CONFIG_TOKEN,
    nodeServer: import.meta.env.VITE_ALGOD_NODE_CONFIG_SERVER,
    nodePort: import.meta.env.VITE_ALGOD_NODE_CONFIG_PORT,
    network: import.meta.env.VITE_ALGOD_NETWORK,
    autoConnect: true,
  })

  return (
    <SnackbarProvider maxSnack={3}>
      <WalletProvider value={walletProviders.walletProviders}>
        <div className="hero min-h-screen bg-teal-400">
          <div className="hero-content text-center rounded-lg p-6 max-w-md bg-white mx-auto">
            <div className="max-w-md">
              <h1 className="text-4xl">
                Welcome to <div className="font-bold">AlgoKit 🙂</div>
              </h1>
              <p className="py-6">
                This starter has been generated using official AlgoKit React template. Refer to the resource below for next steps.
              </p>

              <div className="grid">
                <a className="btn btn-primary m-2" target="_blank" href="https://github.com/algorandfoundation/algokit-cli">
                  Getting started
                </a>

                <div className="divider" />
                <button className="btn m-2" onClick={toggleWalletModal}>
                  Wallet Connection
                </button>

                <button className="btn m-2" onClick={toggleDemoModal}>
                  Transactions Demo
                </button>
              </div>

              <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
              <Transact openModal={openDemoModal} setModalState={setOpenDemoModal} />
            </div>
          </div>
        </div>
      </WalletProvider>
    </SnackbarProvider>
  )
}
