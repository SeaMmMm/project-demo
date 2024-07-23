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

const TicToc = () => {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [user, setUser] = useState('X')

  const handleBoardClick = (index) => {
    if (board[index] === null) {
      const newBoard = [...board]
      newBoard[index] = user
      setBoard(newBoard)

      if (isWin(user, newBoard)) {
        showDiolog(user)
      }
    }
    setUser(user === 'X' ? 'O' : 'X')
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

  const showDiolog = (user) => {
    console.log(user + ' is winner')
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
