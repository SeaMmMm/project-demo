import Lottie from 'lottie-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Animation from '../assets/404.json'

function NotFound() {
  const [inputSequence, setInputSequence] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key

      if (key === 'Enter') {
        if (inputSequence === 'cd ../') {
          navigate('/')
        }
        else {
          setInputSequence('')
        }
      }
      else {
        setInputSequence((prv) => {
          const newSequence = prv + key
          if (newSequence.length > 6) {
            return newSequence.slice(-6)
          }

          return newSequence
        })
      }
    }

    window.addEventListener('keypress', handleKeyPress)

    return () => {
      window.removeEventListener('keypress', handleKeyPress)
    }
  }, [inputSequence, navigate])

  return (
    <>
      <Wrapper>
        <Lottie animationData={Animation} />
      </Wrapper>
      <Back to="/">cd ../</Back>
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
  border-radius: 5px;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #9ca3af;
  }
`

export default NotFound
