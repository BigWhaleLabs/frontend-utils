import { serializeError } from 'eth-rpc-errors'
import { toast } from 'react-toastify'
import axios, { AxiosError } from 'axios'
import parseGSNError from './parseGSNError'
import parseRevertReason from './parseRevertReason'

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

export function parseErrorText(
  error: unknown,
  defaultMessage = ErrorList.unknown
) {
  let displayedError: string | undefined

  if (typeof error === 'string') displayedError = error
  if (error instanceof Error || axios.isAxiosError(error))
    displayedError = error.message
  const message = serializeError(error).message
  if (message) {
    const gSNMessage = parseGSNError(message)
    const revertMessage = parseRevertReason(message)
    if (
      /cannot estimate gas/.test(message) ||
      (!revertMessage && !gSNMessage)
    ) {
      displayedError = ErrorList.invalidProof
    } else {
      displayedError = gSNMessage || revertMessage || message
    }
  }

  if (error instanceof AxiosError && error.response?.data?.message) {
    displayedError = error.response?.data?.message
  }

  return displayedError ?? defaultMessage
}

export const ProofGenerationErrors = {}

export function handleError(error: unknown) {
  console.error(error)

  toast.error(parseErrorText(error))
}
