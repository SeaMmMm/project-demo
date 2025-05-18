import { useState } from 'react'
import { isMobile } from 'react-device-detect'
import styled from 'styled-components'
import { Badge } from '@/components/ui/badge'
import checkIsWin from '@/utils/checkIsWin'
import Board from './Board'
import History from './History'

const WINNER = {
  '1': '黑',
  '-1': '白',
}
const MiniatureBoardContainer = styled.div`
  width: 500px;
  height: 500px;
  transform: scale(0.6); 
  transform-origin: top left;
  
  @media (max-width: 768px) {
    height: 350px; 
    width: 100%;
    transform: scale(0.8);
    transform-origin: center;
  }
`
function BoardWithCurrentPiece({ currentPiece, boardConfigs }) {
  return (
    <MiniatureBoardContainer>
      <Board
        pieces={currentPiece}
        activePiece={currentPiece[currentPiece.length - 1]}
        {...boardConfigs}
      />
    </MiniatureBoardContainer>
  )
}

function initialState(boardConfigs) {
  return {
    places: Array.from({ length: boardConfigs.BOARD_SIZE }, () =>
      Array.from({ length: boardConfigs.BOARD_SIZE })),
    isWin: false,
    activePlayer: 1,
    pieces: [],
  }
}

function Gomoku() {
  const [boardConfigs, setBoardConfigs] = useState({
    BOARD_SIZE: isMobile ? 14 : 20,
    CELL_SIZE: isMobile ? 28 : 40,
  })
  const [gameState, setGameState] = useState(() => initialState(boardConfigs))

  const reset = () => {
    gameState.isWin && setGameState(() => initialState(boardConfigs))
  }

  const handlePlace = (x, y) => {
    if (gameState.isWin || gameState.places[y][x])
      return

    setGameState((state) => {
      const { places, activePlayer, pieces, stepHistory } = state

      const updateBoard = (places, x, y, player) => {
        return places.map((row, rowIndex) =>
          rowIndex === y
            ? row.map((cell, cellIndex) => (cellIndex === x ? player : cell))
            : [...row],
        )
      }

      const newPlaces = updateBoard(places, x, y, activePlayer)
      const currentPiece = { x, y, player: activePlayer }
      const newPieces = [
        ...pieces,
        {
          ...currentPiece,
          Board: (
            <BoardWithCurrentPiece
              boardConfigs={boardConfigs}
              currentPiece={[...pieces, currentPiece]}
            />
          ),
        },
      ]
      const isWin = checkIsWin(newPlaces, { x, y })
      const nextPlayer = newPlaces.flat().filter(Boolean).length % 2 === 0 ? 1 : -1

      return {
        ...state,
        isWin,
        places: newPlaces,
        activePlayer: nextPlayer,
        pieces: newPieces,
      }
    })
  }

  const currentPlayer = WINNER[gameState.activePlayer]
  const winner = WINNER[-gameState.activePlayer]

  return (
    <Wrapper>
      <Content $BOARD_SIZE={boardConfigs.BOARD_SIZE} $CELL_SIZE={boardConfigs.CELL_SIZE}>
        <Board {...boardConfigs} onPlace={handlePlace} pieces={gameState.pieces} />
      </Content>
      <div className="footer">
        <Badge onClick={reset}>
          {!gameState.isWin ? `落子方: ${currentPlayer}` : `≮ ${winner}胜 ≯`}
        </Badge>
        <History gameState={gameState} setGameState={setGameState} />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-items: center;

  .footer {
    display: grid;
    justify-items: center;
    align-items: center;
    gap: 16px;
  }
`
const Content = styled.div`
  position: relative;
  width: ${props => (props.$BOARD_SIZE - 1) * props.$CELL_SIZE}px;
  height: ${props => props.$BOARD_SIZE * props.$CELL_SIZE}px;
  touch-action: none; /* 防止移动端浏览器默认行为 */
  -webkit-tap-highlight-color: transparent; /* 移除iOS点击高亮 */
`

export default Gomoku
