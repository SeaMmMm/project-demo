/**
 * 给定数字，返回指定长度的字符串，不足的部分用 0 填充
 * @param {number} number
 * @param {number} length
 * @returns {string} 将数字作为字符串，用前导零填充至指定长度。
 */
function getFilledNumber(number, length) {
  return number.toString().padStart(length, '0')
}

export default getFilledNumber
