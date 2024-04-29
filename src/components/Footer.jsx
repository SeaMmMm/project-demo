import styled from 'styled-components'
import info from '../assets/icons/info.svg'
import getFilledNumber from '../utils/common/getFilledNumber'
import { useRef, useState } from 'react'
import useClickOutside from '../hooks/useClickOutside'

const Footer = ({ index, data }) => {
  const [showDialog, setShowDialog] = useState(false)
  const [initial, setInitial] = useState(true)
  const ref = useRef(null)

  useClickOutside(ref, () => {
    setShowDialog(false)
  })

  const toggleDialog = () => {
    setShowDialog(!showDialog)
    setInitial(false)
  }

  return (
    <Wrapper>
      <div className='current'>
        <p>{getFilledNumber(index, 3)}</p>
      </div>
      <Info src={info} onClick={toggleDialog}></Info>

      <Content $isShow={showDialog} $initial={initial} ref={ref}>
        <p>{data.description}</p>
        <h1>
          source:{' '}
          <a href={data.codeurl} target='_blank'>
            source
          </a>
        </h1>
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  @keyframes moveUp {
    from {
      transform: translateY(100%) translateX(-50%);
    }
    to {
      transform: translateY(0) translateX(-50%);
    }
  }

  @keyframes moveDown {
    from {
      transform: translateY(0) translateX(-50%);
    }
    to {
      transform: translateY(100%) translateX(-50%);
    }
  }

  position: fixed;
  bottom: 0;
  left: 0;
  padding: 10px;
  align-items: center;

  .current {
    display: flex;
    align-items: center;
    justify-items: center;
    gap: 4px;

    p {
      color: #000000;
      font-weight: bold;
    }
  }
`

const Info = styled.img`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid black;
  border-bottom: none;
  padding: 5px;
  width: 30px;
  cursor: pointer;
  z-index: 100;
`

const Content = styled.div`
  overflow-y: hidden;
  position: fixed;
  bottom: 0;
  left: 50% !important;
  transform: translateX(-50%) translateY(100%);
  border: 1px solid black;
  border-bottom: none;
  padding: 5px;
  z-index: 10;

  padding: 40px 20px;
  min-width: 400px;
  min-height: 140px;

  display: grid;
  align-items: center;
  justify-items: start;
  gap: 10px;

  a {
    color: #d1d5db;
    text-decoration: none;
    transition: all 0.3s ease-in-out;

    &:hover {
      color: #9ca3af;
    }
  }

  ${({ $isShow, $initial }) => {
    if ($isShow) {
      return `animation: moveUp 0.3s forwards;`
    } else if (!$initial) {
      return `animation: moveDown 0.3s forwards`
    }
  }}
`

export default Footer
