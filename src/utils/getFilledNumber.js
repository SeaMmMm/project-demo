/**
 * 给定数字，返回指定长度的字符串，不足的部分用 0 填充
 * @param {number} number
 * @param {number} length
 * @returns
 */
const getFilledNumber = (number, length) => {
  return number.toString().padStart(length, "0");
};

export default getFilledNumber;
