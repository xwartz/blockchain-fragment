import {
  getAccount,
  getAccountResources,
  getCanWithdrawUnfreezeAmount,
  getDelegatedResourceAccountIndexV2,
  getDelegatedResourceV2,
} from './account'
import { TEST_ADDRESS, TEST_RECEIVE_ADDRESS } from './config'
import {
  RESOURCE,
  delegateResource,
  freezeBalanceV2,
  undelegateResource,
  unfreezeBalanceV2,
  withdrawExpireUnfreeze,
} from './tx'

const TRON_UNIT = 1e6

const main = async () => {
  const undelegateTx = await undelegateResource(
    TRON_UNIT,
    TEST_ADDRESS,
    RESOURCE.BANDWIDTH,
    TEST_RECEIVE_ADDRESS,
  )
  console.log('undelegateTx', JSON.stringify(undelegateTx, null, 2))

  const delegateTx = await delegateResource(
    TRON_UNIT,
    TEST_RECEIVE_ADDRESS,
    RESOURCE.BANDWIDTH,
    TEST_ADDRESS,
    false,
  )
  console.log('delegateTx', JSON.stringify(delegateTx, null, 2))

  const freezeTx = await freezeBalanceV2(TRON_UNIT, RESOURCE.BANDWIDTH, TEST_ADDRESS)
  console.log('freezeTx', JSON.stringify(freezeTx, null, 2))

  const unfreezeTx = await unfreezeBalanceV2(
    TRON_UNIT,
    RESOURCE.BANDWIDTH,
    TEST_ADDRESS,
  )
  console.log('unfreezeTx', JSON.stringify(unfreezeTx, null, 2))

  const delegatedResourceAccountIndexV2 = await getDelegatedResourceAccountIndexV2(
    TEST_ADDRESS,
  )
  console.log('delegatedResourceAccountIndexV2', delegatedResourceAccountIndexV2)

  const delegatedResourceV2 = await getDelegatedResourceV2(
    TEST_ADDRESS,
    delegatedResourceAccountIndexV2.toAccounts[0],
  )
  console.log('delegatedResourceV2', delegatedResourceV2)

  const canWithdrawUnfreezeAmount = await getCanWithdrawUnfreezeAmount(TEST_ADDRESS)
  console.log('canWithdrawUnfreezeAmount', canWithdrawUnfreezeAmount)

  const withdrawTx = await withdrawExpireUnfreeze(TEST_ADDRESS)
  console.log('withdrawTx', JSON.stringify(withdrawTx, null, 2))

  const account = await getAccount(TEST_ADDRESS)
  console.log('account', JSON.stringify(account, null, 2))

  const frozenBandwidths = account.frozenV2
    .filter((f: { type: string }) => f.type !== 'ENERGY' && f.type !== 'TRON_POWER')
    .map((f: { amount: number }) => f.amount)
  const frozenBandwidth =
    frozenBandwidths.reduce((a: number, b: number) => a + b, 0) / TRON_UNIT
  console.log('frozenBandwidth', frozenBandwidth)

  const frozenEnergies = account.frozenV2
    .filter((f: { type: string }) => f.type === 'ENERGY')
    .map((f: { amount: number }) => f.amount)
  const frozenEnergy =
    frozenEnergies.reduce((a: number, b: number) => a + b, 0) / TRON_UNIT
  console.log('frozenEnergy', frozenEnergy)

  const balance = account.balance / TRON_UNIT
  console.log('balance', balance)

  const resources = await getAccountResources(TEST_ADDRESS)
  console.log('resources', JSON.stringify(resources, null, 2))
}

main()

// const undelegateTx = {
//   visible: false,
//   txID: '301002655b26c7eee8b123ad2920eeb6523cb12c0309364275679c85ee0605d8',
//   raw_data: {
//     contract: [
//       {
//         parameter: {
//           value: {
//             balance: 10000000,
//             receiver_address: '411cea2eb6b74fd4b7d9610c2b05fc9fd5f3fe8c85',
//             owner_address: '410decd8def9e0e99d8dac765b19a225b462cdbf28',
//           },
//           type_url: 'type.googleapis.com/protocol.UnDelegateResourceContract',
//         },
//         type: 'UnDelegateResourceContract',
//       },
//     ],
//     ref_block_bytes: 'aade',
//     ref_block_hash: '087d39012bebff88',
//     expiration: 1682512029000,
//     timestamp: 1682511971535,
//   },
//   raw_data_hex:
//     '0a02aade2208087d39012bebff8840c8caa0ecfb305a72083a126e0a37747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e556e44656c65676174655265736f75726365436f6e747261637412330a15410decd8def9e0e99d8dac765b19a225b462cdbf281880ade2042215411cea2eb6b74fd4b7d9610c2b05fc9fd5f3fe8c8570cf899decfb30',
// }

// const delegateTx = {
//   visible: false,
//   txID: '7bdfbb73ce4a43e9336440ccb3bb9b42febd496895ee1eea3c37c7c953230c84',
//   raw_data: {
//     contract: [
//       {
//         parameter: {
//           value: {
//             balance: 10000000,
//             receiver_address: '410decd8def9e0e99d8dac765b19a225b462cdbf28',
//             owner_address: '411cea2eb6b74fd4b7d9610c2b05fc9fd5f3fe8c85',
//           },
//           type_url: 'type.googleapis.com/protocol.DelegateResourceContract',
//         },
//         type: 'DelegateResourceContract',
//       },
//     ],
//     ref_block_bytes: 'aa55',
//     ref_block_hash: '9825eee0a88fd9ee',
//     expiration: 1682511612000,
//     timestamp: 1682511553937,
//   },
//   raw_data_hex:
//     '0a02aa5522089825eee0a88fd9ee40e09087ecfb305a700839126c0a35747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e44656c65676174655265736f75726365436f6e747261637412330a15411cea2eb6b74fd4b7d9610c2b05fc9fd5f3fe8c851880ade2042215410decd8def9e0e99d8dac765b19a225b462cdbf287091cb83ecfb30',
// }
