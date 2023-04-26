import { createProvider } from './provider'

const tronWeb = createProvider()

export enum RESOURCE {
  BANDWIDTH = 'BANDWIDTH',
  ENERGY = 'ENERGY',
}
export const unfreezeBalanceV2 = (
  amount: number,
  resource: RESOURCE,
  address: string,
) => {
  return tronWeb.transactionBuilder.unfreezeBalanceV2(amount, resource, address)
}

export const freezeBalanceV2 = (
  amount: number,
  resource: RESOURCE,
  address: string,
) => {
  return tronWeb.transactionBuilder.freezeBalanceV2(amount, resource, address)
}

export const delegateResource = (
  amount: number,
  receiverAddress: string,
  resource: RESOURCE,
  address: string,
  lock: boolean,
) => {
  return tronWeb.transactionBuilder.delegateResource(
    amount,
    receiverAddress,
    resource,
    address,
    lock,
  )
}

export const undelegateResource = (
  amount: number,
  receiverAddress: string,
  resource: RESOURCE,
  address: string,
) => {
  return tronWeb.transactionBuilder.undelegateResource(
    amount,
    receiverAddress,
    resource,
    address,
  )
}
