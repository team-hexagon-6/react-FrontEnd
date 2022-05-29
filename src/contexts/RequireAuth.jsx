import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles,children }) => {
    const { auth } = useAuth();
    const location = useLocation();
    console.log("allowedroles",allowedRoles);
    console.log(auth);
    return (
        allowedRoles?.find(role => auth?.includes(role))
            ? children
            : auth
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;