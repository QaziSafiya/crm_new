import { useEffect } from "react";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import { CLEAR_REDIRECT, SET_REDIRECT } from "../store/actions.js";
import { StoreContext } from "../store/store-context.js";

export default function PrivateRoute({ children }) {
    const location = useLocation();

    const [_, dispatch] = useContext(StoreContext);

    const { currentUser, redirect } = useAuth();

    useEffect(() => {

        if(currentUser || redirect) {
            if(location.pathname !== redirect) {
                dispatch({
                    type: CLEAR_REDIRECT,
                });
            }

            return;
        }

        if(location.pathname === '/') {
            return;
        }

        console.log('REDIRECT', location.pathname);

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

    if(redirect && location.pathname !== redirect) {
        return <Navigate to={redirect} replace />
    }

    return children;
}
