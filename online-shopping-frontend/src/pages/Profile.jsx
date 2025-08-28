import { useAuth } from '../context/AuthContext.jsx'

export default function Profile() {
  const { user } = useAuth()
  return (
    <div>
      <h2>My Profile</h2>
      <div className="card">
        <div>Name: {user?.name}</div>
        <div>Email: {user?.email}</div>
        <div>Roles: {user?.roles?.join(', ') || 'CUSTOMER'}</div>
      </div>
    </div>
  )
}
