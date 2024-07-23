import 'github-markdown-css'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import getFilledNumber from '../../utils/getFilledNumber'
import markdown from './articals/001.md'
import MarkdownContent from './components/Markdown'
import cssInfo from './data/cssInfo'

const CssTopicPage = () => {
  const date = { year: 2024, month: 5, day: 11 }
  const [content, setContent] = useState(markdown)
  const [isError, setIsError] = useState(false)
  const [num, setNum] = useState(1)

  const handleAdd = () => {
    if (isError) return
    setNum(num + 1)
  }

  const handleReset = () => {
    setNum(1)
    setIsError(false)
  }

  const handleDelete = () => {
    if (num === 1) return
    setNum(num - 1)
  }

  useEffect(() => {
    import(`./articals/${getFilledNumber(num, 3)}.md`)
      .then((res) => {
        setContent(res.default)
        setIsError(false)
      })
      .catch(() => {
        setContent("# 404 That's all")
        setIsError(true)
      })
  }, [num])

  return (
    <Wrapper $isError={isError} $num={num}>
      <div className='header'>
        <Header date={date} />
      </div>
      <Content className='markdown-body'>
        <MarkdownContent markdown={content} />
      </Content>
      <div className='add' onClick={handleAdd}>
        {'>'}
      </div>
      <div className='error' onClick={handleReset}>
        -
      </div>
      <div className='delete' onClick={handleDelete}>
        {'<'}
      </div>
      <Footer index={7} data={cssInfo} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  .add,
  .error,
  .delete {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    background: #333;
    color: #fff;
    border-radius: 50%;
    cursor: pointer;
  }

  .error {
    bottom: 5rem;
    transform: translateX(100px);
    transition: transform 0.3s;

    ${({ $isError }) => $isError && 'transform: translateX(0);'}
  }

  .add {
    ${({ $isError }) => $isError && ' background: #ccc;cursor:default;'}
  }

  .delete {
    right: 4rem;
    ${({ $num }) => $num === 1 && 'background: #ccc;cursor:default;'}
  }

  .header {
    @media (max-width: 768px) {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      border-radius: 0 0 20px 20px;
      backdrop-filter: blur(2px);
    }
  }
`

const Content = styled.div`
  line-height: 1.5;
  color: #333;
  max-width: 800px;
  min-height: 100vh;
  padding: 1rem;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 80px 20px;
  }

  * {
    user-select: text;
  }

  pre {
    font-family: 'Fira Code', monospace;
  }
`

export default CssTopicPage
