import getFilledNumber from '../common/getFilledNumber'

describe('getFilledNumber', () => {
  it('should return 0001 when number is 1 and length is 4', () => {
    expect(getFilledNumber(1, 4)).toBe('0001')
  })

  it('should return 0010 when number is 10 and length is 4', () => {
    expect(getFilledNumber(10, 4)).toBe('0010')
  })

  it('should return 0100 when number is 100 and length is 4', () => {
    expect(getFilledNumber(100, 4)).toBe('0100')
  })

  it('should return 1000 when number is 1000 and length is 4', () => {
    expect(getFilledNumber(1000, 4)).toBe('1000')
  })
})
