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
  console.log(error)
  console.log(error.includes("reading 'error'"))
  return error.includes('Insufficient funds') ||
    error.includes("reading 'error'")
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
