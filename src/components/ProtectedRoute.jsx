import { getData } from '@/context/userContext'
import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const {user}= getData();
  return (
    <div>
      {
        user ? children: <Navigate to={'/Login'} />
      }
    </div>
  )
}

export default ProtectedRoute
