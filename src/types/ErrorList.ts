export const ErrorList = {
  clear: '',
  noProvider: 'No provider found',
  wrongNetwork: (userNetwork: string, contractNetwork: string) =>
    `Looks like you're using ${userNetwork} network, try switching to ${contractNetwork} and connect again`,
  unknown: 'An unknown error occurred, please, contact us',
  failedPost: 'Failed to create post',
  invalidProof: 'Merkle Tree Proof is not valid',
  ipfsImageBeingLoaded:
    'NFT is being uploaded to IPFS, please, try again in a few minutes',
  notExistIpfsImage: (imageId: number) =>
    `There is no image with ID ${imageId}`,
  pleaseReconnect: 'Lost connection with your wallet, please, reconnect',
}
