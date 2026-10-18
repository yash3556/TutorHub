import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


function ProtectedRoute({ allowedRoles = [], children }) {
	const { user } = useAuth() || {}

	if (!user) {
		return <Navigate to="/login" replace />
	}

	if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
		
		if (user.role === 'teacher') return <Navigate to="/teacher" replace />
		return <Navigate to="/FindTutor" replace />
	}

	return children
}

export default ProtectedRoute
