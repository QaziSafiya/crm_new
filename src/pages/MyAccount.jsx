import { useState } from "react";
import { useForm } from "react-hook-form";
import { EMAIL_RGX, MOBILE_RGX, PINCODE_RGX } from "../lib/validation.js";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";
import { BASE_URL } from "../constants.js";
import useAuth from "../hooks/useAuth.js";

export default function MyAccount() {
    const { currentUser, token } = useAuth();

    const { register, formState: { errors }, handleSubmit } = useForm();

    const [error, setError] = useState('');
    const [updating, setUpdating] = useState(false);
    const [success, setSuccess] = useState('');

    const onSubmit = async data => {
        try {
            setUpdating(true);
            setError('');

            const response = await fetch(
                `${BASE_URL}/users/update-profile`,
                {
                    method: 'POST',
                    headers: new Headers({
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }),
                    body: data
                }
            );

            const { message } = await response.json();

            setSuccess(message);
        } catch(e) {
            console.error(e);
            setError("Could not update profile.");
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className="container">
            <Sidebar />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    <div className="section">
                        <form className="form flex dir-col g-1rem" onSubmit={handleSubmit(onSubmit)}>
                            {
                                error
                                    ? <div className="error-message">{error}</div>
                                    : null
                            }
                            {
                                success
                                    ? <div className="success-message">{success}</div>
                                    : null
                            }
                            <div className="flex flex-wrap g-1rem">
                                <div className="field">
                                    <label htmlFor="firstName" className="label">First Name</label>
                                    <input 
                                        className="input" 
                                        type="text" 
                                        id="firstName"
                                        {...register('first_name', { 
                                            required: 'First name cannot be blank', 
                                            value: currentUser.first_name,
                                        })}
                                    />
                                    {
                                        errors.first_name
                                            ? <div className="error-message">{errors.first_name.message}</div>
                                            : null
                                    }
                                </div>
                                <div className="field">
                                    <label htmlFor="lastName" className="label">Last name</label>
                                    <input 
                                        className="input" 
                                        type="text" 
                                        id="lastName"
                                        {
                                            ...register('last_name', {
                                                required: 'Last name cannot be blank',
                                                value: currentUser.last_name
                                            })
                                        }
                                    />
                                    {
                                        errors.last_name
                                            ? <div className="error-message">{errors.last_name.message}</div>
                                            : null
                                    }
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="email" className="label">Email</label>
                                <input 
                                    className="input" 
                                    type="email" 
                                    id="email"
                                    {
                                        ...register('email', {
                                            required: 'Email cannot be blank',
                                            value: currentUser.email,
                                            pattern: {
                                                value: EMAIL_RGX,
                                                message: 'Email is not valid'
                                            }
                                        })
                                    }
                                />
                                {
                                    errors.email
                                        ? <div className="error-message">{errors.email.message}</div>
                                        : null
                                }
                            </div>
                            <div className="field">
                                <label htmlFor="pincode" className="label">Pincode</label>
                                <input 
                                    className="input" 
                                    type="text" 
                                    id="pincode"
                                    {
                                        ...register('pincode', {
                                            required: 'Pincode cannot be blank',
                                            pattern: {
                                                value: PINCODE_RGX,
                                                message: 'Invalid Pincode'
                                            },
                                            value: currentUser.pincode
                                        })
                                    }
                                />
                                {
                                    errors.pincode
                                        ? <div className="error-message">{errors.pincode.message}</div>
                                        : null
                                }
                            </div>
                            <div className="field">
                                <label htmlFor="mob" className="label">Mobile No</label>
                                <input 
                                    className="input" 
                                    type="tel" 
                                    id="mob"
                                    {
                                        ...register('phone', {
                                            required: 'Mobile number cannot be blank',
                                            pattern: {
                                                value: MOBILE_RGX,
                                                message: 'Invalid mobile number'
                                            },
                                            value: currentUser.phone
                                        })
                                    }
                                />
                                {
                                    errors.phone
                                        ? <div className="error-message">{errors.phone.message}</div>
                                        : null
                                }
                            </div>
                            <button className="button is-primary">
                                {
                                    updating
                                        ? <span className="spinner small"></span>
                                        : 'Update Profile'
                                }
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}