import useAuth from '@/auth/store'
import { Navigate, Outlet } from 'react-router'

const UserLayout = () => {
  const checkLogin = useAuth((state) => state.checkLogin)

  if (checkLogin()) {
    return (
      <div>
        <Outlet />
      </div>
    )
  }

  return <Navigate to="/login" replace />
}

export default UserLayout