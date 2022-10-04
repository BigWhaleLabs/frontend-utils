import { ErrorList } from 'helpers/handleError'

export default function (error: string) {
  if (/cannot estimate gas/.test(error)) {
    return ErrorList.invalidProof
  }
}
