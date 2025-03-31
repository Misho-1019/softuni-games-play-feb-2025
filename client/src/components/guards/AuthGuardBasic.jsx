import { Navigate, Outlet } from "react-router";
import useAuth from "../../hooks/useAuth";

export default function AuthGuardBasic() {
    const { isAuthenticated } = useAuth()

    if (isAuthenticated) {
        return <Navigate to='/games' />
    }

    return <Outlet />
}