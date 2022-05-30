import { QUERY_BLOCK_LIMIT } from '@big-whale-labs/constants'
import { SealCredLedger } from '@big-whale-labs/seal-cred-ledger-contract'

export interface AddressToMerkleRootMap {
  [address: number]: string
}

export async function getAddressesToMerkleRoot(sealCredLedger: SealCredLedger) {
  const setMerkleRootFilter = sealCredLedger.filters.SetMerkleRoot()
  const deleteMerkleRootFilter = sealCredLedger.filters.DeleteMerkleRoot()

  const topics = []

  if (deleteMerkleRootFilter.topics)
    topics.push(
      Array.isArray(deleteMerkleRootFilter.topics[0])
        ? deleteMerkleRootFilter.topics[0][0]
        : deleteMerkleRootFilter.topics[0]
    )
  if (setMerkleRootFilter.topics)
    topics.push(
      Array.isArray(setMerkleRootFilter.topics[0])
        ? setMerkleRootFilter.topics[0][0]
        : setMerkleRootFilter.topics[0]
    )

  const events = await sealCredLedger.queryFilter(
    {
      topics: [topics],
    },
    QUERY_BLOCK_LIMIT
  )

  return events.reduce((addressToMerkleRoot, event) => {
    const {
      args: { tokenAddress, merkleRoot },
    } = sealCredLedger.interface.parseLog(event)

    if (!merkleRoot) delete addressToMerkleRoot[tokenAddress]
    else addressToMerkleRoot[tokenAddress] = merkleRoot

    return addressToMerkleRoot
  }, {} as AddressToMerkleRootMap)
}
