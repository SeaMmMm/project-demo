import ContentPage from '@/pages/ContentPage'
import NotFound from '../pages/404'
import HomePage from '../pages/HomePage'
import projectRoutes from './projectRoutes'

const routes = [
  { path: '/', element: <HomePage /> },
  {
    path: '/content',
    element: <ContentPage />,
    children: projectRoutes,
  },
  { path: '*', element: <NotFound /> },
]

export default routes
