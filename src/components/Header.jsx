import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import getFormattedDate from '../utils/common/getFormatedDate'

const Header = ({ title, date }) => {
  const navigate = useNavigate()
  const goHome = () => {
    navigate('/')
  }

  return (
    <Head>
      <span onClick={goHome}>{'<'}</span>
      <p>{title}</p>
      <h1>{getFormattedDate(date.year, date.month, date.day)}</h1>
    </Head>
  )
}

const Head = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    padding: 4px 8px;
    font-size: 16px;
    font-weight: lighter;
    cursor: pointer;
    border-radius: 10px;
    transition: all 0.1s ease-in-out;
    border: 1px solid gray;

    &:hover {
      filter: brightness(1.3) contrast(1.1) saturate(1.1) hue-rotate(10deg);
    }
  }
`

export default Header
