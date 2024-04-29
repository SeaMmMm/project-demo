import styled from 'styled-components'
import info from '../assets/icons/info.svg'
import getFilledNumber from '../utils/common/getFilledNumber'

const Footer = ({ index }) => {
  return (
    <Wrapper>
      <div className='current'>
        <p>{getFilledNumber(index, 3)}</p>
      </div>
      <Info src={info}></Info>
    </Wrapper>
  )
}

const Wrapper = styled.div`
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
`

export default Footer
