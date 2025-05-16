const directions = [
  [1, 0], // 横向
  [0, 1], // 纵向
  [1, 1], // 左上-右下
  [1, -1], // 右上-左下
]

function checkIsWin(board, { x, y }, total = 5) {
  const current = board[y][x]
  if (!current)
    return false

  const size = board.length

  for (const [dx, dy] of directions) {
    let count = 1

    // 正方向
    let nx = x + dx
    let ny = y + dy
    while (nx >= 0 && nx < size && ny >= 0 && ny < size && board[ny][nx] === current) {
      count++
      nx += dx
      ny += dy
    }

    // 反方向
    nx = x - dx
    ny = y - dy
    while (nx >= 0 && nx < size && ny >= 0 && ny < size && board[ny][nx] === current) {
      count++
      nx -= dx
      ny -= dy
    }

    if (count >= total)
      return true
  }
  return false
}

export default checkIsWin
