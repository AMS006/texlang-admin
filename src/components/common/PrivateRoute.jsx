import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Layout from './Layout'
import FullScreenLoader from '../Loader/FullScreen'

const PrivateRoute = () => {

    const { user, loading } = useSelector((state) => state.user);
    if (loading) {
        return <FullScreenLoader />;
    }

    if (!loading && !user) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}

export default Layout(PrivateRoute)
