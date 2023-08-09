import { useEffect } from "react";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import { CLEAR_REDIRECT, SET_REDIRECT } from "../store/actions.js";
import { StoreContext } from "../store/store-context.js";

export default function ProtectedRoute({ children }) {
    // const { currentUser, redirect } = useAuth();
    const { currentUser: { user: { userType } }, redirect } = useAuth();
    const [_, dispatch] = useContext(StoreContext);

    const location = useLocation();

    useEffect(() => {
        if(currentUser || redirect) {
            if(location.pathname !== redirect) {
                console.log('REDIRECT', redirect, location.pathname);

                dispatch({
                    type: CLEAR_REDIRECT,
                });
            }

            return;
        }

        dispatch({
            type: SET_REDIRECT,
            payload: {
                redirect: location.pathname
            }
        });
    }, []);
    
    if(!currentUser) {
        return <Navigate to='/login' replace />
    }

    if(!(['admin', 'developer'].includes(userType))) {
        return <Navigate to='/' replace />
    }

    if(redirect && location.pathname !== redirect) {
        return <Navigate to={redirect} replace />
    }

    return children;
}