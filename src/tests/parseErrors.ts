import { exampleErrors } from './exampleErrors'
import { parseError } from '../helpers/parseError'

export default function () {
  console.log('Beginning to test')

  Object.entries(exampleErrors).forEach(
    ([errorName, { error, shouldDisplay }]) => {
      const parsedError = parseError(error)
      if (parsedError !== shouldDisplay)
        console.error(
          `Error "${errorName}" should display "${shouldDisplay}" but it displays "${parsedError}"`
        )
    }
  )

  console.log('End of testing')
}
