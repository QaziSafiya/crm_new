import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import CloseCircleIcon from "../components/icons/CloseCircleIcon.jsx";
import useAuth from "../hooks/useAuth.js"
import { signIn } from "../services/auth.js";
import { AUTH_USER } from "../store/actions.js";
import { StoreContext } from "../store/store-context.js";

import Logo from '../assets/logo.png';
import ViewIcon from "../components/icons/ViewIcon.jsx";
import HideIcon from "../components/icons/HideIcon.jsx";

export default function Login() {
    const { currentUser } = useAuth();

    const [state, dispatch] = useContext(StoreContext);

    const [signinIn, setSigningIn] = useState(false);
    const [error, setError] = useState('');

    const [hidePassword, setHidePassword] = useState(true);

    const handleLogin = async e => {
        e.preventDefault();
        try {
            setSigningIn(true);

            setError('');

            const formData = new FormData(e.target);
            const info = {
                email: formData.get("email"),
                password: formData.get('password')
            }

            const { data, token, status } = await signIn(info);

            if(!status) {
                throw new Error('Some error occured.');
            }

            dispatch({
                type: AUTH_USER,
                payload: {
                    token,
                    user: data
                }
            });
        } catch(e) {
            console.error(e);
            setError(e.message);
        } finally {
            setSigningIn(false);
        }
    };

    if(currentUser) {
        return <Navigate to='/' replace />
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <form className="flex dir-col g-1rem" onSubmit={handleLogin}>
                    <h5>Login</h5>
                    <div className="field">
                        <label htmlFor="email" className="label">Email</label>
                        <input
                            type="email" 
                            className="input" 
                            name="email" 
                            id="email" 
                            placeholder="Email"
                            autoComplete="username"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="password" className="label">Password</label>
                        <div className="input-container">
                            <span onClick={() => setHidePassword(!hidePassword)} className="input-icon">
                                {
                                    hidePassword
                                        ? <HideIcon />
                                        : <ViewIcon />
                                }
                            </span>
                            <input 
                                type={hidePassword ? 'password' : 'text'}
                                className="input" 
                                name="password" 
                                id="password" 
                                placeholder="Password"
                                autoComplete="current-password"
                            />
                        </div>
                    </div>
                    {
                        error
                            ? (
                                <div className="error-message">
                                    <CloseCircleIcon />
                                    {error}
                                </div>
                            )
                            : null
                    }
                    <button className="button is-primary">
                        {
                            signinIn
                                ? <span className="spinner small"></span>
                                : 'Login'
                        }
                    </button>
                </form>
                <p className="text-secondary">
                    &copy; ITaxEasy Pvt Ltd
                </p>
            </div>
        </div>
    )
}