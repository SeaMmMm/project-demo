/* eslint-disable no-console */
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import useHrefTitle from '../../hooks/useHrefTitle'
import useWindowSize from '../../hooks/useWindowSize'
import consoleInfo from './data/description'

const Console = () => {
  const title = useHrefTitle()
  const date = { year: 2024, month: 5, day: 16 }
  const [logs, setLogs] = useState([])
  const [isPhone, setIsPhone] = useState(false)
  const { width } = useWindowSize()

  const logFunc = () => {
    console.log('The answer is:', 42)
    console.debug('Debug information')
    console.info('This is an informational message.')
    console.warn('Warning: This operation is deprecated.')
    console.error('An error occurred while processing the data.')
    console.assert(1 === 2, '1 should be equal to 2.')

    console.count('counter')
    console.count('counter')
    console.count('counter')

    console.group('Group')
    console.log('Name: John Doe')
    console.log('Age: 30')
    console.groupEnd()

    console.time('Timer')
    console.timeLog('Timer', 'Checkpoint 1')
    console.timeLog('Timer', 'Checkpoint 2')
    console.timeEnd('Timer')

    const users = [
      { name: 'John Doe', age: 30 },
      { name: 'Jane Smith', age: 25 },
    ]
    console.table(users)

    const person = { name: 'John Doe', age: 30 }
    console.dir(person)
    console.dirxml(document)

    console.groupCollapsed('Collapsed Group')
    console.log('This group is collapsed by default.')
    console.groupEnd()

    console.memory

    console.log('%c Oh my heavens! ', 'background: #222; color: #bada55', 'more text')
    console.log(
      '%c JavaScript!!',
      'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)'
    )
  }

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
    <Wrapper>
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
    </Wrapper>
  )
}

const Wrapper = styled.div``

const Content = styled.div`
  width: 400px;
  height: 400px;
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
