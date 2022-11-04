export default {
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
  data: '{"tokenAddress":"0x0000000000000000000000000000000000000000","network":"Mainnet"}',
}
