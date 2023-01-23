import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

export default function ProtectedRoute({ children }) {
    const { currentUser } = useAuth();

    if(!currentUser) {
        return <Navigate to='/login' replace />
    }

    if(currentUser.userType !== 'admin') {
        return <Navigate to='/' replace />
    }

    return children;
}