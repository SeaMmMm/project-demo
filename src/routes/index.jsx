// import { lazy, Suspense } from 'react'
// 使用懒加载组件,部署后会出现问题,暂时不使用
// /**
//  * @description: 懒加载组件
//  * @param {string} path
//  * @return {JSX.Element}
//  */
// const lazyLoad = (path) => {
//   const Moudle = lazy(() => import(/* @vite-ignore */ `../pages/${path}`))
//   return (
//     <Suspense fallback={<div>loading...</div>}>
//       <Moudle />
//     </Suspense>
//   )
// }

import NotFound from '../pages/404'
import HomePage from '../pages/HomePage'
import Cardio from '../pages/cardio/Cardio'
import Clock from '../pages/clock/Clock'
import Drum from '../pages/drum/Drum'
import Frame from '../pages/frame/Frame'
import Slider from '../pages/slider/Slider'

export const projects = [
  { path: '/drum', element: <Drum />, name: 'drum' },
  { path: '/clock', element: <Clock />, name: 'clock' },
  { path: '/slider', element: <Slider />, name: 'slider' },
  { path: '/frame', element: <Frame />, name: 'frame' },
  { path: '/cardio', element: <Cardio />, name: 'cardio' },
]

const routes = [
  { path: '/', element: <HomePage /> },
  { path: '*', element: <NotFound /> },
  ...projects,
]

export default routes
