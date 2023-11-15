import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Layout from './Layout'

const PrivateRoute = () => {

    const { user, loading } = useSelector((state) => state.user);
    if (loading) {
        return <p>Loading...</p>;
    }

    if (!loading && !user) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}

export default Layout(PrivateRoute)
