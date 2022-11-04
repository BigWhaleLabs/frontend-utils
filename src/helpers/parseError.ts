import { AxiosError } from 'axios'
import { ErrorList } from '../types/ErrorList'
import {
  parseCannotEstimateGasError,
  parseGSNError,
  parseMetamaskReason,
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

  // 3. Try to extract the reason from string errors
  const parsedError =
    parseMetamaskReason(displayedError) ||
    parseGSNError(displayedError) ||
    parseRevertReason(displayedError) ||
    parseCannotEstimateGasError(displayedError)
  if (parsedError) displayedError = parsedError

  // 4. Try to serialize it to RPC error
  const serializedMessage = serializeError(displayedError || error, {
    shouldIncludeStack: false,
  }).message

  return displayedError || serializedMessage || defaultMessage
}
