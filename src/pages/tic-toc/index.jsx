import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import styled from "styled-components";

const winnerSets = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const initializeState = () => ({
  board: Array(9).fill(null),
  user: "X",
  isTie: false,
  isOpen: false,
  isBegin: false,
});

const TicToc = () => {
  const [gameState, setGameState] = useState(initializeState());
  const [history, setHistory] = useState([]);

  const handleGameStateUpdate = (updates) =>
    setGameState((prevState) => ({ ...prevState, ...updates }));

  const handleBoardClick = (index) => {
    if (gameState.board[index] !== null) return;

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.user;
    handleGameStateUpdate({ board: newBoard });
    setHistory([...history, newBoard]);

    if (isWin(gameState.user, newBoard) || isTie(newBoard)) {
      showDialog(isTie(newBoard));
    } else {
      handleGameStateUpdate({ user: toggleUser(gameState.user), isBegin: true });
    }
  };

  const isTie = (board) => !board.includes(null);
  const isWin = (user, board) =>
    winnerSets.some((set) => set.every((index) => board[index] === user));
  const toggleUser = (user) => (user === "X" ? "O" : "X");
  const showDialog = (tie) => handleGameStateUpdate({ isOpen: true, isTie: tie });
  const reset = () => setGameState({ ...initializeState() });

  const backStep = () => {
    if (history.length <= 1) {
      reset();
    } else {
      history.pop();
      handleGameStateUpdate({
        board: history[history.length - 1],
        user: toggleUser(gameState.user),
      });
    }
  };

  return (
    <>
      <Wrapper>
        <div className="box">
          {gameState.board.map((item, index) => (
            <div key={index} className="cell" onClick={() => handleBoardClick(index)}>
              {item}
            </div>
          ))}
        </div>
        <Button variant="outline" disabled={!gameState.isBegin} size="icon" onClick={backStep}>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <AlertDialog open={gameState.isOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {gameState.isTie ? "平局" : `玩家 ${gameState.user} 获胜`}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {gameState.isTie ? "🤔" : "Congradulations!"}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={reset}>再来一局</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  justify-items: center;
  align-content: center;
  gap: 30px;
  justify-content: center;
  align-items: center;
  .box {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .cell {
    width: 100px;
    height: 100px;
    border: 0.8px solid black;
    display: grid;
    justify-items: center;
    align-content: center;
  }
`;

export default TicToc;
