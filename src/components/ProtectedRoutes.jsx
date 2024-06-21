import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const user = useSelector((state) => state.user);

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
