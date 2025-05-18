import styled from 'styled-components'

const defaultPieces = []

function Board({
  BOARD_SIZE = 20,
  CELL_SIZE = 40,
  onPlace,
  pieces = defaultPieces,
  activePiece,
  ...props
}) {
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
    <div {...props}>
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

      {activePiece && (
        <>
          {/* 横向高亮线 */}
          <HighlightLine
            style={{
              top: activePiece.y * CELL_SIZE,
              left: 0,
              width: (BOARD_SIZE - 1) * CELL_SIZE,
              height: 1,
            }}
          />
          {/* 纵向高亮线 */}
          <HighlightLine
            style={{
              left: activePiece.x * CELL_SIZE,
              top: 0,
              width: 1,
              height: (BOARD_SIZE - 1) * CELL_SIZE,
            }}
          />
        </>
      )}

      {/* 棋子展示 */}
      {pieces.map(piece => (
        <Piece
          key={crypto.randomUUID()}
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
    </div>
  )
}

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
  
  ${({ $isActive }) => $isActive && `
    box-shadow: 0 0 6px 2px rgba(255, 215, 0, 0.7);
    z-index: 4;
  `}
`

const HighlightLine = styled.div`
  position: absolute;
  background: rgba(255, 215, 0, 0.6); /* 金色半透明 */
  z-index: 1;
  box-shadow: 0 0 5px rgba(255, 215, 0, 0.8);
  pointer-events: none;
`

export default Board
