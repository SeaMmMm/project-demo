import styled from 'styled-components'

const DrumButton = ({ letter, description, showNum, index }) => {
  return (
    <Wrapper>
      <h1 className={showNum === index ? 'show' : ''}>{letter}</h1>
      <span className={showNum === index ? 'show' : ''}>{description}</span>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  transition: all 0.1s ease-in-out;

  h1 {
    font-size: 100px;
    font-weight: 800;
    color: #d1d5db;
  }

  span {
    font-size: 20px;
    font-weight: 800;
    color: #d1d5db;
  }

  .show {
    transform: scale(1.1);
    color: #a5b4fc;
  }
`

export default DrumButton
