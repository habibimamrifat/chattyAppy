import UserHomeNavBar from '@/components/userHomeNav'
import { Outlet } from 'react-router-dom'

const UserHome = () => {
  return (
    <div>
      <UserHomeNavBar />
      <div className='container mx-auto max-w-7xl px-6 flex-grow pt-16'>
        <Outlet />
      </div>

    </div>
  )
}

export default UserHome
