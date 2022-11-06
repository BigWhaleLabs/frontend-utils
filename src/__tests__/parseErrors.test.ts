import { expect, test } from '@jest/globals'
import { negativeExamples, positiveExamples } from '../testHelpers/exapleErrors'
import { parseError } from '../helpers/parseError'

test('Error parser test', () => {
  Object.values(positiveExamples).forEach(({ error, shouldDisplay }) => {
    const parsedError = parseError(error)
    expect(parsedError).toBe(shouldDisplay)
  })
  Object.values(negativeExamples).forEach(({ error, shouldDisplay }) => {
    const parsedError = parseError(error)
    expect(parsedError).not.toBe(shouldDisplay)
  })
})
