/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENVIRONMENT: string
  readonly VITE_ALGOD_NODE_CONFIG_TOKEN: string
  readonly VITE_ALGOD_NODE_CONFIG_SERVER: string
  readonly VITE_ALGOD_NODE_CONFIG_PORT: string

  readonly VITE_ALGOD_NETWORK: string
  readonly VITE_CREATOR_ADDRESS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
