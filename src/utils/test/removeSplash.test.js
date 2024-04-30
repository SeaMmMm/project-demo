import { describe, expect, it } from '@jest/globals'
import removeSplash from '../common/removeSplash'
describe('removeSplash', () => {
  it('should remove the first splash', () => {
    expect(removeSplash('/test')).toBe('test')
  })

  it('just return', () => {
    expect(removeSplash('test')).toBe('test')
  })

  it('should throw error', () => {
    expect(() => removeSplash(123)).toThrow('The argument must be a string')
  })
})
