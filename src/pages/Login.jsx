import { useContext, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import CloseCircleIcon from "../components/icons/CloseCircleIcon.jsx";
import useAuth from "../hooks/useAuth.js"
import { signInWithEmail, verifyEmail } from "../services/auth.js";
import { AUTH_USER } from "../store/actions.js";
import { StoreContext } from "../store/store-context.js";

import Logo from '/icon.svg';
import ViewIcon from "../components/icons/ViewIcon.jsx";
import HideIcon from "../components/icons/HideIcon.jsx";
import { BASE_URL } from "../constants.js";
import SuccessMessage from "../components/messages/SuccessMessage.jsx";
import BackIcon from "../components/icons/BackIcon.jsx";

export default function Login() {
    const { currentUser } = useAuth();
    //console.log(currentUser)

    const [state, dispatch] = useContext(StoreContext);

    const loginFormRef = useRef();
    const otpFormRef = useRef();
    const otpInputRef = useRef();

    const [signinIn, setSigningIn] = useState(false);
    const [error, setError] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [verifying, setVerifying] = useState(false);
    const [otpId, setOtpId] = useState(null);
    const [otp, setOtp] = useState('');

    const [hidePassword, setHidePassword] = useState(true);

    const handleLogin = async e => {
        e.preventDefault();
        try {
            setSigningIn(true);

            setError('');
            
            const info = {
                email,
                password,
            };

            const { success, message, otp_key } = await signInWithEmail(info);

            if(!success) {
                throw new Error(message);
            }

            setOtpId(otp_key);

            otpFormRef.current.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
            });

            otpInputRef.current.focus({ preventScroll: true });
        } catch(e) {
            console.error(e);
            setError(e.message);
        } finally {
            setSigningIn(false);
        }
    };

    const handleOtp = async e => {
        e.preventDefault();
        try {
            setVerifying(true);

            const { data, token, success } = await verifyEmail({
                otpId,
                otp,
                email
            });

            console.log(otpId, otp, email);

            if(!success) {
                throw new Error('Some error occured.');
            }
            console.log(data.user.id)
            const userProfileRequest = await fetch(`${BASE_URL}/user/profile/${data.user.id}`, {
                headers: new Headers({
                    'Authorization': `Basic ${token}`,
                }),
            });

            const { data: userData = {} } = (await userProfileRequest?.json()) || {};

            // console.log(data, token);
            //  localStorage.setItem("itaxToken",JSON.stringify(token))
            // localStorage.setItem("itaxData",JSON.stringify(data))


            dispatch({
                type: AUTH_USER,
                payload: {
                    token,
                    user: {
                        ...data,
                        ...userData
                    }
                }
            });
        } catch(e) {
            console.error(e);
            setError(e.message);
        } finally {
            setVerifying(false);
        }
    }

    const handleBack = () => {
        setOtp('');
        setOtpId(null);
        setError('');
        loginFormRef.current.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
        });
    };

    if(currentUser) {
        return <Navigate to='/' replace />
    }
    

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="multi-form-container">
                    <div className="multi-form">
                        <form ref={loginFormRef} className="flex flex-1 dir-col g-1rem" onSubmit={handleLogin}>
                            <div className="flex jc-center ai-center">
                                <img src={Logo} width={96} height={96} />
                            </div>
                            <div className="field">
                                <label htmlFor="email" className="label">Email</label>
                                <input
                                    type="email" 
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
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
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
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
                    </div>
                    <div className="multi-form">
                        <form ref={otpFormRef} className="flex flex-1 dir-col g-1rem" onSubmit={handleOtp}>
                            <h5 className="text-center">Verify OTP</h5>
                            <SuccessMessage message={`OTP has been sent to ${email}`} />
                            <div className="field">
                                <label htmlFor="otp" className="label">OTP</label>
                                <input
                                    ref={otpInputRef}
                                    type="otp" 
                                    className="input" 
                                    name="otp" 
                                    id="otp" 
                                    value={otp}
                                    onChange={e => setOtp(e.target.value)}
                                    placeholder="OTP"
                                />
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
                                    verifying
                                        ? <span className="spinner small"></span>
                                        : 'Verify'
                                }
                            </button>
                            <button onClick={handleBack} type="button" className="button reveal-button has-icon">
                                <BackIcon />
                                Back
                            </button>
                        </form>
                    </div>
                </div>
                <p className="m-2rem mt-1rem">
                    &copy; iTaxEasy Pvt Ltd
                </p>
            </div>
        </div>
    )
}