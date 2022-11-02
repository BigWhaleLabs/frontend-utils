export function parseCannotEstimateGasError(message: string) {
  return /cannot estimate gas/.test(message)
}

function extractMetamaskReason(gSNError: string) {
  const metaMaskMessage = 'MetaMask Message Signature:'
  if (gSNError.includes(metaMaskMessage))
    return gSNError.split(metaMaskMessage)[1]?.split(' stack:')[0]
}
export function parseGSNError(gSNError: string) {
  return extractMetamaskReason(gSNError)
}

export function parseRevertReason(serializedError: string) {
  try {
    return JSON.parse(serializedError.split(', ')[3].replace('error=', ''))
      .message as string
  } catch {
    return undefined
  }
}
