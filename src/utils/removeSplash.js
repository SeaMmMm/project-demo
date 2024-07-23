/**
 * @description: 去掉字符串首位的斜杠
 * @param {string} str
 * @return {string}
 */
const removeSplash = (str) => {
  if (typeof str !== 'string') {
    throw new Error('The argument must be a string')
  }

  if (str[0] !== '/') {
    return str
  }

  return str.slice(1)
}

export default removeSplash
