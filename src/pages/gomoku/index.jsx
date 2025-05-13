import { useState } from "react";
import styled from "styled-components";
import Board from "./Board";
import { isMobile } from "react-device-detect";

const initialState = (boardConfigs) => ({
  places: Array.from({ length: boardConfigs.BOARD_SIZE }, () =>
    Array.from({ length: boardConfigs.BOARD_SIZE })
  ),
  isWin: false,
  activePlayer: 1,
  pieces: [],
});

const checkIsWin = (board, { x, y }) => {
  const current = board[y][x];
  if (!current) return false;

  const total = 5;
  const directions = [
    [1, 0], // 横向
    [0, 1], // 纵向
    [1, 1], // 左上-右下
    [1, -1], // 右上-左下
  ];
  const size = board.length;

  for (const [dx, dy] of directions) {
    let count = 1;

    // 正方向
    let nx = x + dx,
      ny = y + dy;
    while (nx >= 0 && nx < size && ny >= 0 && ny < size && board[ny][nx] === current) {
      count++;
      nx += dx;
      ny += dy;
    }

    // 反方向
    nx = x - dx;
    ny = y - dy;
    while (nx >= 0 && nx < size && ny >= 0 && ny < size && board[ny][nx] === current) {
      count++;
      nx -= dx;
      ny -= dy;
    }

    if (count >= total) return true;
  }
  return false;
};

const Gomoku = () => {
  const [boardConfigs, setBoardConfigs] = useState({
    BOARD_SIZE: isMobile ? 10 : 20,
    CELL_SIZE: isMobile ? 34 : 40,
  });
  const [gameState, setGameState] = useState(initialState(boardConfigs));

  const reset = () => {
    setGameState(initialState(boardConfigs));
  };

  const handlePlace = (x, y) => {
    if (gameState.isWin || gameState.places[y][x]) return;

    setGameState((state) => {
      const { places, activePlayer, pieces } = state;

      const newPlaces = updateBoard(places, x, y, activePlayer);
      const newPieces = [...pieces, { x, y, player: activePlayer }];

      const isWin = checkIsWin(newPlaces, { x, y });
      const nextPlayer = newPlaces.flat().filter(Boolean).length % 2 === 0 ? 1 : -1;

      return { ...state, isWin, places: newPlaces, activePlayer: nextPlayer, pieces: newPieces };
    });
  };

  const updateBoard = (places, x, y, player) => {
    return places.map((row, rowIndex) =>
      rowIndex === y ? row.map((cell, cellIndex) => (cellIndex === x ? player : cell)) : [...row]
    );
  };

  return (
    <Wrapper>
      <Board {...boardConfigs} onPlace={handlePlace} pieces={gameState.pieces} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default Gomoku;
