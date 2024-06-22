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
import NHLpage from './pages/NHLpage'
import MLBpage from './pages/MLBpage'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import EditProfilePage from './pages/EditProfilePage'
import GameDetailPage from './pages/GameDetailPage';
import SportsNewsPage from './pages/SportsNewsPage'

const App = () => {

  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path='/' element={ <MainLayout /> }>
      <Route index element={<HomePage />} />,
      <Route path='/nba' element={<NBApage />} />,
      <Route path='/game/:gameId' element={<GameDetailPage />} />,
      <Route path='/nfl' element={<NFLpage />} />,
      <Route path='/nhl' element={<NHLpage />} />,
      <Route path='/mlb' element={<MLBpage />} />,
      <Route path='/login' element={<LoginPage />} />,
      <Route path='/register' element={<RegisterPage />} />,
      <Route path='/profile' element={<ProfilePage />}/>,
      <Route path='/profile/:username' element={<ProfilePage />} />,
      <Route path='/edit-profile' element={<EditProfilePage />} />,
      <Route path='/sports-news' element={<SportsNewsPage />} />,
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