import { describe, expect, it } from '@jest/globals'
import getFormatedData from '../common/getFormatedDate'

describe('getFormatedData', () => {
  it('should return the expected format', () => {
    const year = 2022
    const month = 1
    const day = 1
    const expectedOutput = '2022-1-1 Sat'

    const result = getFormatedData(year, month, day)

    expect(result).toEqual(expectedOutput)
  })
})
