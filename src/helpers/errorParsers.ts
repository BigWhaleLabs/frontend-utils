import { ErrorList } from '../types/ErrorList'

export function parseCannotEstimateGasError(error: string) {
  return error.includes('cannot estimate gas')
    ? ErrorList.invalidProof
    : undefined
}

export function parseMetamaskReason(error: string) {
  const metaMaskMessage = 'MetaMask Message Signature:'
  if (error.includes(metaMaskMessage))
    return error.split(metaMaskMessage)[1]?.split(' stack:')[0]
}

export function parseGSNError(error: string) {
  return error.includes('insufficient funds') ||
    error.includes("reading 'error'") ||
    error.includes('Failed to relay call')
    ? ErrorList.gsnError
    : undefined
}

export function parseRevertReason(serializedError: string) {
  try {
    return JSON.parse(serializedError.split(', ')[3].replace('error=', ''))
      .message as string
  } catch {
    return undefined
  }
}
