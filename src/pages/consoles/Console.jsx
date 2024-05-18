/* eslint-disable no-console */
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import useHrefTitle from '../../hooks/useHrefTitle'
import useWindowSize from '../../hooks/useWindowSize'
import consoleInfo from './data/description'
import logFunc from './scripts/logFunc'

const Console = () => {
  const title = useHrefTitle()
  const date = { year: 2024, month: 5, day: 16 }
  const [logs, setLogs] = useState([])
  const [isPhone, setIsPhone] = useState(false)
  const { width } = useWindowSize()

  useEffect(() => {
    const originalConsoleLog = console.log

    if (width < 768) {
      setIsPhone(true)
      console.log = (...args) => {
        const [message, style] = args

        originalConsoleLog('message', args)
        if (style) {
          setLogs((prevLogs) => [...prevLogs, { message, style }])
        } else {
          setLogs((prevLogs) => [...prevLogs, { message, style: '' }])
        }
        originalConsoleLog.apply(console, args)
      }
    } else setIsPhone(false)

    logFunc()

    return () => {
      console.log = originalConsoleLog
    }
  }, [width])

  return (
    <>
      <Header title={title} date={date} />
      <Content $isPhone={isPhone}>
        <span>CONSOLE.LOG</span>
        <p>{isPhone ? '' : 'Open the console to view the output'}</p>
        {isPhone &&
          logs.map((log, index) => (
            <P key={index} $styles={log.style}>
              {log.message}
            </P>
          ))}
      </Content>
      <Footer index={9} data={consoleInfo} />
    </>
  )
}

const Content = styled.div`
  width: 340px;
  height: 340px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #000;
  overflow-y: scroll;

  display: flex;
  justify-content: ${({ $isPhone }) => ($isPhone ? 'flex-start' : 'center')};
  align-items: center;
  flex-direction: column;
  text-align: center;
  gap: 10px;

  font-size: 2rem;
  font-weight: bold;
`

const P = styled.p`
  ${({ $styles }) => $styles};
`

export default Console
