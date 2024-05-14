import Lottie from 'lottie-react'
import styled from 'styled-components'
import Animation from '../assets/404.json'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
      <Wrapper>
        <Lottie animationData={Animation} />
      </Wrapper>
      <Back to='/'>cd ../</Back>
    </>
  )
}

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scaleY(0.7);
  width: 100%;
`

const Back = styled(Link)`
  position: absolute;
  top: 2;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 10px;
  text-decoration: none;
  font-weight: bold;
  color: #d1d5db;
  border: 1px solid #d1d5db;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #9ca3af;
    border-color: #374151d2;
  }
`

export default NotFound
