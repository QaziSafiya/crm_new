import { useEffect, useState } from "react";
import Footer from "../../components/Footer.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";
import { BASE_URL } from "../../constants.js";
import useAuth from "../../hooks/useAuth.js";
import useMultiStateForm from "../../hooks/useMultiStepForm.jsx"

function SendOTPForm({ setOtpId, nextStep }) {
    const { token, currentUser } = useAuth();

    const [email, setEmail] = useState(currentUser.email);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState('');

    const handleForm = async e => {
        e.preventDefault();
        try {
            setSending(true);
            // const response = await fetch(`${BASE_URL}/email/otp`, {
            //     method: 'POST',
            //     body: {
            //         email,
            //         type: 'FORGET'
            //     }
            // });
            // console.log(response);
            setOtpId(1);
            nextStep();
        } catch(e) {
            console.error(e);
            setError(e.message);
        } finally {
            setSending(false);
        }
    };

    return (
        <form onSubmit={handleForm} className="flex dir-col g-1rem">
            <div className="field">
                <label htmlFor="email" className="label">Email</label>
                <input
                    type="email" 
                    name="email" 
                    id="email" 
                    className="input"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={true}
                />
            </div>
            {
                error
                    ? <div className="error-message">{error}</div>
                    : null
            }
            <button className="button is-primary">
                {
                    sending
                        ? <span className="spinner small"></span>
                        : 'Send OTP'
                }
            </button>
        </form>
    )
}

function ConfirmOTPForm({ nextStep }) {
    const { token, currentUser } = useAuth();

    const [otp, setOtp] = useState('');
    const [confirming, setConfirming] = useState(false);
    const [error, setError] = useState('');

    const handleForm = async e => {
        e.preventDefault();
        try {
            setConfirming(true);
            // const response = await fetch(`${BASE_URL}/email/otp`, {
            //     method: 'POST',
            //     body: {
            //         email,
            //         type: 'FORGET'
            //     }
            // });
            // console.log(response);
            nextStep();
        } catch(e) {
            console.error(e);
            setError(e.message);
        } finally {
            setConfirming(false);
        }
    };

    return (
        <form onSubmit={handleForm} className="flex dir-col g-1rem">
            <div className="field">
                <label htmlFor="otp" className="label">OTP</label>
                <input
                    type="text" 
                    name="otp" 
                    id="otp" 
                    className="input"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                />
            </div>
            {
                error
                    ? <div className="error-message">{error}</div>
                    : null
            }
            <button className="button is-primary">
                {
                    confirming
                        ? <span className="spinner small"></span>
                        : 'Confirm OTP'
                }
            </button>
        </form>
    )
}

function ChangePasswordForm({ nextStep }) {
    const { token, currentUser } = useAuth();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState('');

    const handleForm = async e => {
        e.preventDefault();
        try {
            setUpdating(true);
            // const response = await fetch(`${BASE_URL}/email/otp`, {
            //     method: 'POST',
            //     body: {
            //         email,
            //         type: 'FORGET'
            //     }
            // });
            // console.log(response);
        } catch(e) {
            console.error(e);
            setError(e.message);
        } finally {
            setUpdating(false);
        }
    };

    return (
        <form onSubmit={handleForm} className="flex dir-col g-1rem">
            <div className="field">
                <label htmlFor="otp" className="label">New Password</label>
                <input
                    type="password" 
                    name="password" 
                    id="password" 
                    className="input"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div className="field">
                <label htmlFor="otp" className="label">Confirm Password</label>
                <input
                    type="password" 
                    name="cpassword" 
                    id="cpassword" 
                    className="input"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
            </div>
            {
                error
                    ? <div className="error-message">{error}</div>
                    : null
            }
            <button className="button is-primary">
                {
                    updating
                        ? <span className="spinner small"></span>
                        : 'Update Password'
                }
            </button>
        </form>
    )
}


export default function ChangePassword() {
    const [otpId, setOtpId] = useState('');

    const { step } = useMultiStateForm({
        steps: (next, prev) => [
            <SendOTPForm setOtpId={setOtpId} nextStep={next} />,
            <ConfirmOTPForm nextStep={next} />,
            <ChangePasswordForm />
        ]
    });

    return (
        <div className='container'>
            <Sidebar />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    <h6 className="text-secondary">Change Password</h6>
                    <div className="section">
                        {step}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}