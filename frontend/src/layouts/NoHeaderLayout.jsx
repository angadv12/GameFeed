// NoHeaderLayout.jsx
import { Outlet } from 'react-router-dom'

const NoHeaderLayout = () => {
  return (
    <main className='min-h-screen bg-slate-900'>
      <Outlet />
    </main>
  )
}

export default NoHeaderLayout
