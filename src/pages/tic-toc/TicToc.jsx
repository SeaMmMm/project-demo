import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { ChevronLeftIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import styled from 'styled-components'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import description from './data/description'

const winnerSets = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]
let history = []

const TicToc = () => {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isTie, setIsTie] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isBegin, setIsBegin] = useState(false)
  const [user, setUser] = useState('X')

  const handleBoardClick = (index) => {
    if (board[index] !== null) return

    const newBoard = [...board]
    newBoard[index] = user
    setBoard(newBoard)
    history.push(newBoard)

    if (isWin(user, newBoard)) {
      showDiolog()
      return
    }

    if (newBoard.filter((item) => item === null).length === 0) {
      setIsTie(true)
      showDiolog()
      return
    }

    setUser(user === 'X' ? 'O' : 'X')
    setIsBegin(true)
  }

  const isWin = (user, board) => {
    let result = false
    winnerSets.forEach((set) => {
      if (
        board[set[0]] === user &&
        board[set[1]] === user &&
        board[set[2]] === user
      )
        result = true
    })
    return result
  }

  const showDiolog = () => {
    setIsOpen(true)
  }

  const reset = () => {
    setBoard(Array(9).fill(null))
    setIsOpen(false)
    setUser('X')
    setIsBegin(false)
    history = []
  }

  const backStep = () => {
    if (history.length === 1) {
      reset()
      return
    } else {
      history.pop()
      setBoard(history[history.length - 1])
      setUser(user === 'X' ? 'O' : 'X')
    }
  }

  return (
    <>
      <Header />
      <Wrapper>
        <div className='box'>
          {board.map((item, index) => (
            <div
              key={index}
              className='cell'
              onClick={() => handleBoardClick(index)}
            >
              {item}
            </div>
          ))}
        </div>
        <Button
          variant='outline'
          disabled={!isBegin}
          size='icon'
          onClick={backStep}
        >
          <ChevronLeftIcon className='h-4 w-4' />
        </Button>
        <AlertDialog open={isOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {isTie ? '平局' : `玩家 ${user} 获胜`}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {isTie ? '🤔' : 'Congradulations!'}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={reset}>再来一局</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Wrapper>
      <Footer index={12} data={description} />
    </>
  )
}

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
`

export default TicToc
