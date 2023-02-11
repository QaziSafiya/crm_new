import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import { CLEAR_REDIRECT } from "../store/actions.js";
import { StoreContext } from "../store/store-context.js";

export default function PrivateRoute({ children }) {
    const location = useLocation();

    const [_, dispatch] = useContext(StoreContext);

    const { currentUser, redirect } = useAuth();

    if(!currentUser) {
        return <Navigate to='/login' replace />
    }

    if(redirect && location !== redirect) {
        dispatch({
            type: CLEAR_REDIRECT,
        });

        return <Navigate to={redirect} replace />
    }

    return children;
}