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
  data: '{"tokenAddress":"0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85","network":"Mainnet"}',
}
