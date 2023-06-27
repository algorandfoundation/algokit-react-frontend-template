import { DeflyWalletConnect } from '@blockshake/defly-connect'
import { PeraWalletConnect } from '@perawallet/connect'
import { AlgodClientOptions, defly, exodus, kmd, pera, PROVIDER_ID, reconnectProviders, WalletClient } from '@txnlab/use-wallet'
import algosdk from 'algosdk'
import { useEffect } from 'react'

type SupportedProviders = Partial<{
  kmd: Promise<WalletClient | null>
  pera: Promise<WalletClient | null> // ok
  myalgo: Promise<WalletClient | null>
  algosigner: Promise<WalletClient | null>
  defly: Promise<WalletClient | null> // ok
  exodus: Promise<WalletClient | null> // ok
  walletconnect: Promise<WalletClient | null>
  mnemonic: Promise<WalletClient | null>
}>

let providerIds: PROVIDER_ID[] = []
if (import.meta.env.VITE_ALGOD_NETWORK === '') {
  providerIds.push(PROVIDER_ID.KMD)
} else {
  providerIds = [PROVIDER_ID.PERA, PROVIDER_ID.DEFLY, PROVIDER_ID.EXODUS]
}
const walletProviders: SupportedProviders = {}

export function useAlgoWallet(context: { autoConnect: boolean; network: string; nodeServer: string; nodePort: string; nodeToken: string }) {
  const algodOptions = [context.nodeToken, context.nodeServer, context.nodePort] as AlgodClientOptions

  const network = context.network

  providerIds.forEach((id) => {
    if (id in walletProviders) {
      return
    } else {
      switch (id) {
        case PROVIDER_ID.PERA:
          walletProviders[id] = pera.init({
            algosdkStatic: algosdk,
            clientStatic: PeraWalletConnect,
            clientOptions: {
              shouldShowSignTxnToast: true,
            },
            algodOptions: algodOptions,
            network: network,
          })
          break
        case PROVIDER_ID.DEFLY:
          walletProviders[id] = defly.init({
            algosdkStatic: algosdk,
            clientStatic: DeflyWalletConnect,
            algodOptions: algodOptions,
            network: network,
          })
          break
        case PROVIDER_ID.EXODUS:
          walletProviders[id] = exodus.init({
            algosdkStatic: algosdk,
            algodOptions: algodOptions,
            network: network,
          })
          break

        default:
          if (import.meta.env.VITE_ALGOD_NETWORK === '') {
            walletProviders[PROVIDER_ID.KMD] = kmd.init({
              algosdkStatic: algosdk,
              algodOptions: algodOptions,
              network: network,
            })
          }
      }
    }
  })

  useEffect(() => {
    if (context.autoConnect) {
      reconnectProviders(walletProviders)
    }
  }, [])

  return {
    walletProviders,
  }
}
