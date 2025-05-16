/**
 * @description: 去掉字符串首位的斜杠
 * @param {string} str
 * @return {string}
 */
function removeSplash(str) {
  if (typeof str !== 'string') {
    throw new TypeError('The argument must be a string')
  }

  if (str[0] !== '/') {
    return str
  }

  return str.slice(1)
}

export default removeSplash
