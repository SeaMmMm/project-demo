import { lazy, Suspense } from 'react'
import HomePage from '../pages/HomePage'

/**
 * @description: 懒加载组件
 * @param {string} path
 * @return {JSX.Element}
 */
const lazyLoad = (path) => {
  const Moudle = lazy(() => import(/* @vite-ignore */ `../pages/${path}`))
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Moudle />
    </Suspense>
  )
}

const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/drum', element: lazyLoad('drum/Drum'), meta: { index: 0 } },
  { path: '*', element: lazyLoad('404') },
]

export default routes
