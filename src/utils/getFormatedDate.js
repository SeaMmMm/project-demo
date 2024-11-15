/**
 * @description: 返回格式化后的日期
 * @param {number} year
 * @param {number} month
 * @param {number} day
 * @return {string}
 */
const getFormatedData = (year, month, day) => {
  const weekArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date(year, month - 1, day);
  const week = date.getDay();

  const weekStr = weekArr[week];

  return `${year}-${month >= 10 ? month : `0${month}`}-${day >= 10 ? day : `0${day}`} ${weekStr}`;
};

export default getFormatedData;
