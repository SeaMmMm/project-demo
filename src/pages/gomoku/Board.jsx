import styled from 'styled-components'

const defaultPieces = []

function Board({ BOARD_SIZE = 20, CELL_SIZE = 40, onPlace, pieces = defaultPieces }) {
  // 生成交点数组
  const points = []
  for (let x = 0; x < BOARD_SIZE; x++) {
    for (let y = 0; y < BOARD_SIZE; y++) {
      points.push({ x, y })
    }
  }

  // 点击交点时回调
  const handleClick = (x, y) => {
    if (onPlace)
      onPlace(x, y)
  }

  return (
    <Wrapper $BOARD_SIZE={BOARD_SIZE} $CELL_SIZE={CELL_SIZE}>
      {/* 横线 */}
      {Array.from({ length: BOARD_SIZE }).map((_, i) => (
        <Line
          key={crypto.randomUUID()}
          style={{
            top: i * CELL_SIZE,
            left: 0,
            width: (BOARD_SIZE - 1) * CELL_SIZE,
            height: 1,
          }}
        />
      ))}
      {/* 竖线 */}
      {Array.from({ length: BOARD_SIZE }).map((_, i) => (
        <Line
          key={crypto.randomUUID()}
          style={{
            left: i * CELL_SIZE,
            top: 0,
            width: 1,
            height: (BOARD_SIZE - 1) * CELL_SIZE,
          }}
        />
      ))}

      {/* 棋子展示 */}
      {pieces.map(piece => (
        <Piece
          key={`${piece.x}-${piece.y}`}
          style={{
            left: `${piece.x * CELL_SIZE}px`,
            top: `${piece.y * CELL_SIZE}px`,
            width: CELL_SIZE - 16,
            height: CELL_SIZE - 16,
            background: piece.player === 1 ? '#222' : '#fff',
          }}
        />
      ))}

      {/* 交点点击区域 */}
      {points.map(p => (
        <PointHotArea
          $p={p}
          $BOARD_SIZE={BOARD_SIZE}
          $CELL_SIZE={CELL_SIZE}
          key={`${p.x}-${p.y}`}
          onClick={() => handleClick(p.x, p.y)}
        />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: ${props => (props.$BOARD_SIZE - 1) * props.$CELL_SIZE}px;
  height: ${props => props.$BOARD_SIZE * props.$CELL_SIZE}px;
  touch-action: none; /* 防止移动端浏览器默认行为 */
  -webkit-tap-highlight-color: transparent; /* 移除iOS点击高亮 */
`

const Line = styled.div`
  position: absolute;
  background: #333;
`

const PointHotArea = styled.div.attrs(({ $p, $CELL_SIZE }) => ({
  style: {
    left: `${$p.x * $CELL_SIZE}px`,
    top: `${$p.y * $CELL_SIZE}px`,
    width: 20,
    height: 20,
  },
}))`
  position: absolute;
  cursor: pointer;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`

const Piece = styled.div`
  position: absolute;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  box-sizing: border-box;
  border: 1px solid #333;
  transform: "translate(-50%, -50%)";
`

export default Board
