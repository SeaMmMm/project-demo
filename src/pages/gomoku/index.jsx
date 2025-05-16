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
    BOARD_SIZE: isMobile ? 10 : 20,
    CELL_SIZE: isMobile ? 34 : 40,
  })
  const [gameState, setGameState] = useState(() => initialState(boardConfigs))

  const reset = () => {
    setGameState(initialState(boardConfigs))
  }

  const handlePlace = (x, y) => {
    if (gameState.isWin || gameState.places[y][x])
      return

    setGameState((state) => {
      const { places, activePlayer, pieces } = state

      const updateBoard = (places, x, y, player) => {
        return places.map((row, rowIndex) =>
          rowIndex === y ? row.map((cell, cellIndex) => (cellIndex === x ? player : cell)) : [...row],
        )
      }

      const newPlaces = updateBoard(places, x, y, activePlayer)
      const newPieces = [...pieces, { x, y, player: activePlayer }]
      const isWin = checkIsWin(newPlaces, { x, y })
      const nextPlayer = newPlaces.flat().filter(Boolean).length % 2 === 0 ? 1 : -1

      return { ...state, isWin, places: newPlaces, activePlayer: nextPlayer, pieces: newPieces }
    })
  }

  const currentPlayer = WINNER[gameState.activePlayer]
  const winner = WINNER[-gameState.activePlayer]

  return (
    <Wrapper>
      <Board {...boardConfigs} onPlace={handlePlace} pieces={gameState.pieces} />
      <Badge onClick={reset}>
        {!gameState.isWin ? `落子方: ${currentPlayer}` : `${winner}胜 <<`}
      </Badge>
      <History gameState={gameState} setGameState={setGameState} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  justify-items: center;
`

export default Gomoku
