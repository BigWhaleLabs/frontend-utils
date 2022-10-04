import { ErrorList } from 'helpers/handleError'

export default function (error: string) {
  const errorMessage = 'user rejected signing'
  if (error.includes(errorMessage)) {
    return ErrorList.rejectSignature
  }
}
