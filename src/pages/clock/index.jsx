import styled from 'styled-components'
import Dial from './Dial'

function Clock() {
  return (
    <>
      <Wrapper>
        <Dial />
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

export default Clock
