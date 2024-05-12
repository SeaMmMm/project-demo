import { useState } from 'react'
import styled from 'styled-components'

const Card = ({ info }) => {
  const { head, content, foot } = info
  const [show, setShow] = useState(false)

  const handleClick = () => {
    setShow(!show)
  }

  return (
    <Div onClick={handleClick} $show={show}>
      <h1>{head}</h1>
      <p>{content}</p>
      <h3>{foot}</h3>
    </Div>
  )
}

const Div = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 2fr 1fr;
  justify-items: center;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border: 1px solid black;
  border-right: none;
  overflow: hidden;
  transform: ${(props) => (props.$show ? 'scaleX(1.1)' : 'scaleX(1)')};

  &:last-child {
    border-right: 1px solid black;
  }

  *,
  & {
    transition: all 0.7s cubic-bezier(0.61, -0.19, 0.7, -0.11);
  }

  p {
    font-size: 1.2rem;
    font-weight: bold;

    ${(props) => props.$show && 'font-size: 1.5rem;'}
  }

  h1 {
    transform: translateY(-15vh);
    ${(props) => props.$show && 'transform: translateY(0);'}
  }

  h3 {
    transform: translateY(15vh);
    ${(props) => props.$show && 'transform: translateY(0);'}
  }

  h1,
  h3 {
    animation-delay: 0.5s;
  }

  @media (max-width: 768px) {
    border: 1px solid black;

    h1,
    p,
    h3 {
      font-size: 1rem;
    }
  }
`

export default Card
