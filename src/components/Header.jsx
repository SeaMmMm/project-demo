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
    transition: all 0.3s ease-in-out;
    border: 1px solid rgba(255, 255, 255, 0.18);

    &:hover {
      box-shadow: 0 2px 8px 0 rgba(31, 38, 135, 0.37);
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
    }
  }

  h1 {
  }
`

export default Header
