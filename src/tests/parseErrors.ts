import { exampleErrors } from './exampleErrors'
import { parseErrorText } from 'helpers/handleError'

export default function () {
  console.log('Beginning to test')
  Object.entries(exampleErrors).forEach(
    ([errorName, { error, shouldDisplay }]) => {
      const parsedError = parseErrorText(error)
      if (parsedError !== shouldDisplay)
        console.error(
          `Error "${errorName}" should display "${shouldDisplay}" but it displays "${parsedError}"`
        )
    }
  )

  console.log('End of testing')
}
