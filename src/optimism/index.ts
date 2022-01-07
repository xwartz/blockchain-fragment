import { getContractFactory, predeploys } from '@eth-optimism/contracts'
import { serialize } from '@ethersproject/transactions'
import { providers } from 'ethers'

const unsignedTx = {
  // nonce: 0,
  value: '0x0',
  gasPrice: 100 * 1e9,
  gasLimit: 20 * 1e4,
  to: '0x0C082937Ec49e5Eab1c663C36A61CAb62678E05B',
  data: '0x',
}

const L2_RPC_URL = 'https://mainnet.optimism.io'
const getL1Fee = async () => {
  const provider = new providers.JsonRpcProvider(L2_RPC_URL)
  const OVMGasPriceOracle = getContractFactory('OVM_GasPriceOracle')
    .attach(predeploys.OVM_GasPriceOracle)
    .connect(provider)
  const serializedTx = serialize(unsignedTx)
  const l1Fee = await OVMGasPriceOracle.getL1Fee(serializedTx)
  const l1GasUsed = await OVMGasPriceOracle.getL1GasUsed(serializedTx)
  const l1GasPrice = await OVMGasPriceOracle.l1BaseFee()
  return {
    l1Fee,
    l1GasPrice,
    l1GasUsed,
  }
}

const start = async () => {
  const { l1Fee, l1GasPrice, l1GasUsed } = await getL1Fee()
  console.log('l1Fee', l1Fee.toString())
  console.log('l1GasPrice', l1GasPrice.toString())
  console.log('l1GasUsed', l1GasUsed.toString())

  console.log(`l1Fee = l1GasPrice * l1GasUsed * 1.5`)
  console.log(`${l1Fee} = ${l1GasPrice * l1GasUsed * 1.5}`)
}

start()
