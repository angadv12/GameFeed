// NoHeaderLayout.jsx
import { Outlet } from 'react-router-dom'

const NoHeaderLayout = () => {
  return (
    <main className='min-h-screen bg-bgDark'>
      <Outlet />
    </main>
  )
}

export default NoHeaderLayout
