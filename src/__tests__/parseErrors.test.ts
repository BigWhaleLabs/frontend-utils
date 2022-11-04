import { exampleErrors } from '../helpers/exapleErrors'
import { expect, test } from '@jest/globals'
import { parseError } from '../helpers/parseError'

test('Error parser test', () => {
  Object.values(exampleErrors).forEach(({ error, shouldDisplay }) => {
    const parsedError = parseError(error)
    expect(parsedError).toBe(shouldDisplay)
  })
})
