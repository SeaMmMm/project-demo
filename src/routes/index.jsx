// import { lazy, Suspense } from 'react'
import HomePage from '../pages/HomePage'
import Drum from '../pages/drum/Drum'
import NotFound from '../pages/404'

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

const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/drum', element: <Drum /> },
  { path: '*', element: <NotFound /> },
]

export default routes
