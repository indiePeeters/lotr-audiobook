import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Routes from '@/shared/enums/routes';
import { Home } from '@/features/Home/Home.tsx';
import { Error } from '@/features/Error/Error.tsx'
import { ChapterOverview } from '@/features/ChapterOverview/ChapterOverview';
import { AudioPlayer } from '@/features/AudioPlayer/AudioPlayer';

const Router = (): JSX.Element => {
  const router = createBrowserRouter([
    {
      element: (
        <div>
          <Outlet />
        </div>
      ),
      children: [
        {
          path: Routes.ListenToChapter,
          element: (
            <div>
              <AudioPlayer />
            </div>
          ),
        },
        {
          path: Routes.ChapterOverview,
          element: (
            <div>
              <ChapterOverview />
            </div>
          ),
        },
        {
          path: Routes.Error,
          element: (
            <div>
              <Error/>  
            </div>
          )
        },
        {
          path: Routes.Root,
          element: (
            <div>
              <Home />
            </div>
          ),
        },
      ],
      errorElement: <Error />,
    }
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
