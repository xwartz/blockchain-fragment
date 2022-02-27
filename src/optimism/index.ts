import { getContractFactory, predeploys } from '@eth-optimism/contracts'
import { serialize } from '@ethersproject/transactions'
import { providers } from 'ethers'

const RPC_URL = 'https://mainnet.optimism.io'
const unsignedTx = {
  data: '',
  value: '0x0',
  gasPrice: 100 * 1e9,
  gasLimit: 20 * 1e4,
  to: '0xbb36D3465D8afae08B08CB59eF389Cc9387eFf38',
}
const getL1Fee = async () => {
  const provider = new providers.JsonRpcProvider(RPC_URL)
  const OVMGasPriceOracle = getContractFactory('OVM_GasPriceOracle')
    .attach(predeploys.OVM_GasPriceOracle)
    .connect(provider)
  const serializedTx = serialize(unsignedTx)
  const l1Fee = await OVMGasPriceOracle.getL1Fee(serializedTx)
  const l1GasUsed = await OVMGasPriceOracle.getL1GasUsed(serializedTx)
  const l1GasPrice = await OVMGasPriceOracle.l1BaseFee()
  const scalar = await OVMGasPriceOracle.scalar()
  return {
    l1Fee,
    l1GasPrice,
    l1GasUsed,
    scalar: scalar / 1e6,
  }
}

const start = async () => {
  const { l1Fee, l1GasPrice, l1GasUsed, scalar } = await getL1Fee()
  console.log(
    `l1Fee(${l1Fee}) = l1GasPrice(${l1GasPrice}) * l1GasUsed(${l1GasUsed}) * scalar(${scalar})`,
  )
}

start()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e)
    process.exit(1)
  })
