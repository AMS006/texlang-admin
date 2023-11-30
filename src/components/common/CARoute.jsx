import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Layout from './Layout'
import FullScreenLoader from '../Loader/FullScreen'
import { Roles } from '../../data/constants'

const CARoute = () => {

    const { user, loading } = useSelector((state) => state.user);
    if (loading) {
        return <FullScreenLoader />;
    }

    if (!loading && !user) {
        return <Navigate to="/" />;
    }

    if (user && user.role !== Roles.COMPANY_ADMIN)
        return <Navigate to="/" />;

    return <Outlet />;
}

export default Layout(CARoute)
