import { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import styled from 'styled-components'
import routes from './routes'

const App = () => {
  const [routers] = useState(routes)
  const elements = useRoutes(routers)
  document.title = '100 dm'

  return <Wrapper>{elements}</Wrapper>
}

const Wrapper = styled.div`
  font-family: 'JetBrains Mono', 'Fira Code', Menlo, Monaco, Consolas, 'Liberation Mono',
    'Courier New', monospace;
`

export default App
