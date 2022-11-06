import { AxiosError } from 'axios'
import { ErrorList } from '../types/ErrorList'
import { hasMessage } from './hasMessage'
import {
  parseCannotEstimateGasError,
  parseGSNError,
  parseMetamaskReason,
  parseRevertReason,
} from '../testHelpers/errorParsers'

export function parseError(
  error: unknown,
  defaultMessage = ErrorList.unknown
): string {
  // 1. Define "exit" conditions, when there's a specific error type
  if (error instanceof AxiosError && error.response?.data?.message)
    return error.response.data.message

  // 2. Get the message from string error, if possible
  if (typeof error === 'string' || hasMessage(error)) {
    const message = hasMessage(error) ? error.message : error
    const parsedError =
      parseMetamaskReason(message) ||
      parseGSNError(message) ||
      parseRevertReason(message) ||
      parseCannotEstimateGasError(message)
    return parsedError || message
  }

  return defaultMessage
}
