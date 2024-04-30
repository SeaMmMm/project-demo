import { useRef, useState } from 'react'
import styled from 'styled-components'
import info from '../assets/icons/info.svg'
import useClickOutside from '../hooks/useClickOutside'
import useLayer from '../store/layer'
import getFilledNumber from '../utils/common/getFilledNumber'

const Footer = ({ index, data }) => {
  const [showDialog, setShowDialog] = useState(false)
  const [isInitial, setIsInitial] = useState(true)
  const ref = useRef(null)
  const infoRef = useRef(null)

  const isShowLayer = useLayer((state) => state.isShowLayer)
  const toggleLayer = useLayer((state) => state.toggleLayer)
  const setToHideLayer = useLayer((state) => state.setLayerToFalse)

  useClickOutside(ref, (e) => {
    if (e.target === infoRef.current) return

    setShowDialog(false)
    setToHideLayer()
  })

  const toggleDialog = () => {
    setShowDialog(!showDialog)
    toggleLayer()
    setIsInitial(false)
  }

  return (
    <>
      <Mosk $isShow={isShowLayer} $initial={isInitial} />
      <Wrapper>
        <div className='current'>
          <p>{getFilledNumber(index, 3)}</p>
        </div>
        <Info src={info} onClick={toggleDialog} ref={infoRef} />
        <Content $isShow={showDialog} $initial={isInitial} ref={ref}>
          <p>{data.description}</p>
          <h1>
            source:{' '}
            <a href={data.codeurl} target='_blank'>
              source
            </a>
          </h1>
        </Content>
      </Wrapper>
    </>
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
  z-index: 5;

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
  background: #ffffff;
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
  background: #ffffff;
  overflow-y: hidden;
  position: fixed;
  bottom: 0;
  left: 50% !important;
  transition: all 0.3s ease-in-out;
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
    transition: all 0.2s ease-in-out;
    color: #d1d5db;
    text-decoration: none;

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

const Mosk = styled.div`
  @keyframes showUp {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.5;
    }
  }

  @keyframes showDown {
    from {
      opacity: 0.5;
    }
    to {
      opacity: 0;
    }
  }

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.3;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: all 0.2s ease-in-out;

  ${({ $isShow, $initial }) => {
    if ($isShow) {
      return `animation: showUp 0.2s forwards;`
    } else if (!$initial) {
      return `animation: showDown 0.2s forwards;`
    }
  }}
`

export default Footer
