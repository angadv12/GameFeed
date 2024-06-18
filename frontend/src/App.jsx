import { Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider} 
  from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import NoHeaderLayout from './layouts/NoHeaderLayout'
import HomePage from './pages/HomePage'
import NBApage from './pages/NBApage'
import NFLpage from './pages/NFLpage'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import GameDetailPage from './pages/GameDetailPage';

const App = () => {

  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path='/' element={ <MainLayout /> }>
      <Route index element={<HomePage />} />,
      <Route path='/nba' element={<NBApage />} />,
      <Route path='/game/:gameId' element={<GameDetailPage />} />,
      <Route path='/nfl' element={<NFLpage />} />,
      <Route path='/login' element={<LoginPage />} />,
      <Route path='/register' element={<RegisterPage />} />,
      <Route path='/profile' element={<ProfilePage />} />,
    </Route>

    <Route path='*' element={<NoHeaderLayout />}>
      <Route path='*' element={<NotFoundPage />} />,
    </Route>
    </>
  ))

  return (
    <RouterProvider router={ router } />
  )
}
export default App