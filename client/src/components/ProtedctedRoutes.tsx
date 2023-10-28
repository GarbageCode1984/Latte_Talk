import { Navigate, Outlet } from "react-router-dom";

interface ProtedctedRoutesProps {
    isAuth: boolean;
}

const ProtedctedRoutes: React.FC<ProtedctedRoutesProps> = ({ isAuth }) => {
    return isAuth ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtedctedRoutes;
