import { ErrorList } from '../types/ErrorList'
import { expect, test } from '@jest/globals'
import { parseError } from '../helpers/parseError'

const exampleErrors = {
  axiosError: {
    error: {
      message: 'Request failed with status code 400',
      name: 'AxiosError',
      config: {
        transitional: {
          silentJSONParsing: true,
          forcedJSONParsing: true,
          clarifyTimeoutError: false,
        },
        transformRequest: [null],
        transformResponse: [null],
        timeout: 0,
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
        maxContentLength: -1,
        maxBodyLength: -1,
        env: {
          FormData: null,
        },
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        method: 'post',
        url: 'https://verify.sealcred.xyz/v0.2.1/verify/contract-metadata',
        data: '{"tokenAddress":"0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85","network":"Mainnet"}',
      },
      code: 'ERR_BAD_REQUEST',
      status: 400,
    },
    shouldDisplay: 'Request failed with status code 400',
  },
  insufficientFunds: {
    error: {
      code: -32000,
      message:
        'err: insufficient funds for gas * price + value: address 0x0000000000000000000000000000000000000000 have 2130760518416292149 want 23675865423000000000 (supplied gas 500000000)',
    },
    shouldDisplay: ErrorList.gsnError,
  },
  failedToRelayCall: {
    error: 'Error: Failed to relay call. Results:',
    shouldDisplay: ErrorList.gsnError,
  },
  unhandledRejection: {
    error:
      "Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'error')",
    shouldDisplay: ErrorList.gsnError,
  },
}

test('Error parser test', () => {
  Object.values(exampleErrors).forEach(({ error, shouldDisplay }) => {
    const parsedError = parseError(error)
    expect(parsedError).toBe(shouldDisplay)
  })
})
