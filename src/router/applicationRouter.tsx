import { BuilderPage } from '@/pages/builder'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { BUILDER_ROUTE, LOG_ROUTE } from './routes'
import { LogPage } from '@/pages/log'

const router = createBrowserRouter([
  {
    path: BUILDER_ROUTE,
    element: <BuilderPage />,
  },
  {
    path: LOG_ROUTE,
    element: <LogPage />,
  },
  {
    path: '*',
    element: <BuilderPage />,
  },
])

export const ApplicationRouter = () => <RouterProvider router={router} />
