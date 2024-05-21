import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import useHrefTitle from '../hooks/useHrefTitle'
import getFormattedDate from '../utils/common/getFormatedDate'
import { useEffect } from 'react'

const Header = ({ date, isFixed }) => {
  const title = useHrefTitle()
  const navigate = useNavigate()
  const goHome = () => {
    navigate('/')
  }

  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <Head $isFixed={isFixed}>
      <span onClick={goHome}>{'<'}</span>
      <p>{title}</p>
      <h1>{getFormattedDate(date.year, date.month, date.day)}</h1>
    </Head>
  )
}

Header.prototype = {
  isFixed: PropTypes.bool,
  date: {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    day: PropTypes.number.isRequired,
  },
}

const Head = styled.header`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ $isFixed }) => $isFixed && 'position: fixed; top: 0; left: 0; width: 100%;'}

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

  @media (max-width: 768px) {
    p,
    h1 {
      font-size: 12px;
    }
  }
`

export default Header
