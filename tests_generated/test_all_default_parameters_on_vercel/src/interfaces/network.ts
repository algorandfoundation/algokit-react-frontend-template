import { AlgoClientConfig } from '@algorandfoundation/algokit-utils/types/network-client'

export interface AlgoViteClientConfig extends AlgoClientConfig {
  /** String representing current Algorand Network type (testnet/mainnet and etc) */
  network?: string
}
