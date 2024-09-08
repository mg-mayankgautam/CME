import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = (
    // { allowedRoles }
) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        // auth?.roles?.find(role => allowedRoles?.includes(role))
        auth?.username

            ? <Outlet />
            // : auth?.user
                :  <Navigate to="/Login" state={{ from: location }} replace />
                // <Navigate to="/unauthorized" state={{ from: location }} replace />
                
    );
}

export default RequireAuth;