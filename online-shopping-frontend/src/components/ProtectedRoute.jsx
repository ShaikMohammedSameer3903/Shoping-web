import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProtectedRoute({ children, requireSeller=false }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (requireSeller && !user.roles?.includes('SELLER')) return <Navigate to="/" replace />
  return children
}
