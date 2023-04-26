// @ts-ignore - tronweb is not typed
import TronWeb from 'tronweb'
import { NETWORK_TO_CONFIG, Network } from './config'

const rpcUrl = NETWORK_TO_CONFIG[Network.NILE].rpcUrl

export const createProvider = (rpc: string = rpcUrl) => {
  return new TronWeb({
    fullHost: rpc,
  })
}
