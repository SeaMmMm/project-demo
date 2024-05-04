import PropTypes from 'prop-types'
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

Header.prototype = {
  title: PropTypes.string.isRequired,
  date: {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    day: PropTypes.number.isRequired,
  },
}

const Head = styled.header`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    padding: 4px 8px;
    color: #374151d2;
    font-size: 18px;
    font-weight: lighter;
    cursor: pointer;
    border-radius: 10px;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: #9ca3af;
    }
  }
`

export default Header
