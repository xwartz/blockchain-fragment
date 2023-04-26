import { createProvider } from './provider'

const tronWeb = createProvider()

export const getAccount = (address: string) => {
  return tronWeb.trx.getAccount(address)
}

export const getAccountResources = (address: string) => {
  return tronWeb.trx.getAccountResources(address)
}

export const getCanWithdrawUnfreezeAmount = (address: string) => {
  return tronWeb.trx.getCanWithdrawUnfreezeAmount(address)
}

export const getDelegatedResourceAccountIndexV2 = (address: string) => {
  return tronWeb.trx.getDelegatedResourceAccountIndexV2(address)
}

export const getDelegatedResourceV2 = (fromAddress: string, toAddress: string) => {
  return tronWeb.trx.getDelegatedResourceV2(fromAddress, toAddress)
}
