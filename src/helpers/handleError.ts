import { parseError } from './parseError'
import { toast } from 'react-toastify'

export function handleError(error: unknown) {
  console.error(error)

  toast.error(parseError(error))
}
