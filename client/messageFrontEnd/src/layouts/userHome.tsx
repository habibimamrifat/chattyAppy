import UserHomeNavBar from '@/components/userHomeNav'
import { Outlet } from 'react-router-dom'

const UserHome = () => {
  return (
    <div>
      <UserHomeNavBar/>
      <Outlet/>
    </div>
  )
}

export default UserHome
