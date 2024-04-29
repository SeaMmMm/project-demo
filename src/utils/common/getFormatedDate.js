/**
 * @description: 返回格式化后的日期
 * @param {number} year
 * @param {number} month
 * @param {number} day
 * @return {string}
 */
const getFormatedData = (year, month, day) => {
  const weekArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const date = new Date(year, month - 1, day)
  const week = date.getDay()

  const weekStr = weekArr[week]

  return `${year}-${month}-${day} ${weekStr}`
}

export default getFormatedData
