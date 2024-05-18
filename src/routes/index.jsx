/* 懒加载会出现问题，先不用这个
import { lazy, Suspense } from 'react'
const lazyLoad = (path) => {
  const Moudle = lazy(() => import( `../pages/${path}`))
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Moudle />
    </Suspense>
  )
} 
*/

import NotFound from '../pages/404'
import HomePage from '../pages/HomePage'
import Canvas from '../pages/canvas/Canvas'
import Cardio from '../pages/cardio/Cardio'
import Clock from '../pages/clock/Clock'
import Console from '../pages/consoles/Console'
import CssTopicPage from '../pages/css-topics'
import Drum from '../pages/drum/Drum'
import Frame from '../pages/frame/Frame'
import Panel from '../pages/panel/Panel'
import Slider from '../pages/slider/Slider'

export const projects = [
  { path: '/drum', element: <Drum />, name: 'drum' },
  { path: '/clock', element: <Clock />, name: 'clock' },
  { path: '/slider', element: <Slider />, name: 'slider' },
  { path: '/frame', element: <Frame />, name: 'frame' },
  { path: '/cardio', element: <Cardio />, name: 'cardio' },
  { path: '/panel', element: <Panel />, name: 'panel' },
  { path: '/css', element: <CssTopicPage />, name: 'css' },
  { path: '/canvas', element: <Canvas />, name: 'canvas' },
  { path: '/console', element: <Console />, name: 'console' },
]

const routes = [
  { path: '/', element: <HomePage /> },
  { path: '*', element: <NotFound /> },
  ...projects,
]

export default routes
