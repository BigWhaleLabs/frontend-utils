import { AxiosError } from 'axios'
import { ErrorList } from '../types/ErrorList'
import {
  parseCannotEstimateGasError,
  parseGSNError,
  parseRevertReason,
} from './errorParsers'
import { serializeError } from 'eth-rpc-errors'

export function parseError(
  error: unknown,
  defaultMessage = ErrorList.unknown
): string {
  // 1. Define "exit" conditions, when there's a specific error type
  if (error instanceof AxiosError && error.response?.data?.message)
    return error.response.data.message

  // 2. Get the message from the error, if possible
  let displayedError = ''

  if (typeof error === 'string') displayedError = error
  if (error instanceof Error) displayedError = error.message

  // 3. Serialize the error and set it to return in the end
  const serializedMessage = serializeError(displayedError || error, {
    shouldIncludeStack: false,
  }).message

  const gsnRelatedMessage =
    parseGSNError(serializedMessage) || parseRevertReason(serializedMessage)
  const cannotEstimateGasError = parseCannotEstimateGasError(serializedMessage)
  if (cannotEstimateGasError) displayedError = ErrorList.invalidProof
  if (gsnRelatedMessage) displayedError = gsnRelatedMessage

  return displayedError || defaultMessage
}
