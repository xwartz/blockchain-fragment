export enum Network {
  NILE = 'NILE',
}

export type NetworkConfig = {
  rpcUrl: string
  explorer: string
}

export const NETWORK_TO_CONFIG: Record<Network, NetworkConfig> = {
  [Network.NILE]: {
    rpcUrl: 'https://nile.trongrid.io',
    explorer: 'https://nile.tronscan.org',
  },
}

export const TEST_ADDRESS = 'TCc6TiMqBRGNqgu21WRdmxCiXcNM1cCkh8'
export const TEST_RECEIVE_ADDRESS = 'TBEqWyspTESSFSx3Gg8vwwa6xZjZZpenN9'
