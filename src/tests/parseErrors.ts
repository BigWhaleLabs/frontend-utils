import { parseErrorText } from 'helpers/handleError'
import axiosError from './exampleErrors/axiosError'

export default function () {
  if (!(parseErrorText(axiosError) === 'Request failed with status code 400'))
    console.error('Axios test failed')
}
