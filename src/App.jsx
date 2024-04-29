import { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './routes'

const App = () => {
  const [routers] = useState(routes)
  const elements = useRoutes(routers)

  return <>{elements}</>
}

export default App
