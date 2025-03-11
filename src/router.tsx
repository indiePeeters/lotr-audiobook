import { Outlet, RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import Routes from '@/shared/enums/routes';
import { Home } from '@/features/Home/Home.tsx';
import { Error } from '@/features/Error/Error.tsx';
import { ChapterOverview } from '@/features/ChapterOverview/ChapterOverview';
import { AudioPlayer } from '@/features/AudioPlayer/AudioPlayer';
import { useEffect } from 'react';

const RedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirectPath = params.get('redirect');

    if (redirectPath) {
      window.history.replaceState({}, '', redirectPath); // Update URL without causing another reload
      navigate(redirectPath, { replace: true }); // Ensure React Router recognizes the new path
    }
  }, [navigate]);

  return null;
};

const Layout = () => (
  <>
    <RedirectHandler /> 
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <Layout />, // Wrap everything inside Layout
    children: [
      { path: Routes.ListenToChapter, element: <AudioPlayer /> },
      { path: Routes.ChapterOverview, element: <ChapterOverview /> },
      { path: Routes.Error, element: <Error /> },
      { path: Routes.Root, element: <Home /> },
      { path: '*', element: <Error /> },
    ],
    errorElement: <Error />,
  },
], { basename: '/' });

const Router = (): JSX.Element => {
  return <RouterProvider router={router} />;
};

export default Router;
