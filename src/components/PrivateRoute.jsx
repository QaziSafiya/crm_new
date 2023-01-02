import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

export default function PrivateRoute({ children }) {
    const { currentUser } = useAuth();

    if(!currentUser) {
        return <Navigate to='/login' replace />
    }

    return children;
}