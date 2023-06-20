import { AlgoViteClientConfig } from '../../interfaces/network'

export function getIndexerConfigFromVercelEnvironment(): AlgoViteClientConfig {
  if (!import.meta || !import.meta.env) {
    throw new Error('Attempt to get default algod configuration from a non Node.js context; supply the config instead')
  }

  if (!import.meta.env.VITE_INDEXER_SERVER) {
    throw new Error('Attempt to get default algod configuration without specifying VITE_INDEXER_SERVER in the environment variables')
  }

  return {
    server: import.meta.env.VITE_INDEXER_SERVER,
    port: import.meta.env.VITE_INDEXER_PORT,
    token: import.meta.env.VITE_INDEXER_TOKEN,
    network: import.meta.env.VITE_ALGOD_NETWORK,
  }
}
