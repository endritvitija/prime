import { createBrowserRouter } from 'react-router-dom';
import Page404 from '@/views/info/Page404';
import Root from '@/views/root/Root';
import Home from '@/views/home/Home';
import Project from './views/project/Project';
import Charts from './views/charts/Charts';
import Data from './views/data/Data';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Page404 />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'projects/:projectId',
        element: <Project />,
      },
      {
        path: 'charts',
        element: <Charts />,
      },
      {
        path: 'data',
        element: <Data />,
      }
    ],
  },
]);

export default router;
