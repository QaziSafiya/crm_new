import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { EMAIL_RGX, MOBILE_RGX, PINCODE_RGX } from "../../lib/validation.js";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";
import { BASE_URL } from "../../constants.js";
import useAuth from "../../hooks/useAuth.js";
import CloseCircleIcon from "../../components/icons/CloseCircleIcon.jsx";
import { StoreContext } from "../../store/store-context.js";
import { UPDATE_USER } from "../../store/actions.js";
import CheckCircleIcon from "../../components/icons/CheckCircleIcon.jsx";

export default function MyAccount() {
    const { currentUser, token } = useAuth();

    const [_, dispatch] = useContext(StoreContext);

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
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify(data),
                    redirect: "follow"
                }
            );

            const { message } = await response.json();
            
            dispatch({
                type: UPDATE_USER,
                payload: data
            });

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
                    <h6 className="text-secondary">My Account</h6>
                    <div className="section w-max-content mx-auto">
                        <h6 className="text-large">Edit Profile</h6>
                        <form className="form flex dir-col g-1rem" onSubmit={handleSubmit(onSubmit)}>
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
                            {
                                success
                                    ? (
                                        <div className="success-message">
                                            <CheckCircleIcon />
                                            {success}
                                        </div>
                                    )
                                    : null
                            }
                            <div className="flex flex-wrap g-1rem">
                                <div className="field flex-1">
                                    <label htmlFor="firstName" className="label">First Name</label>
                                    <input 
                                        className="input is-small" 
                                        type="text" 
                                        id="firstName"
                                        {...register('first_name', { 
                                            required: 'First name cannot be blank', 
                                            value: currentUser.first_name,
                                        })}
                                    />
                                    {
                                        errors.first_name
                                            ? (
                                                <div className="error-message">
                                                    <CloseCircleIcon />
                                                    {errors.first_name.message}
                                                </div>
                                            )
                                            : null
                                    }
                                </div>
                                <div className="field flex-1">
                                    <label htmlFor="lastName" className="label">Last name</label>
                                    <input 
                                        className="input is-small" 
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
                                            ? (
                                                <div className="error-message">
                                                    <CloseCircleIcon />
                                                    {errors.last_name.message}
                                                </div>
                                            )
                                            : null
                                    }
                                </div>
                            </div>
                            <div className="flex flex-wrap g-1rem">
                                <div className="field flex-1">
                                    <label htmlFor="aadhar" className="label">Aadhaar</label>
                                    <input 
                                        className="input is-small" 
                                        type="text" 
                                        id="aadhar"
                                        {...register('aadhar', { 
                                            value: currentUser.aadhar,
                                        })}
                                    />
                                    {
                                        errors.aadhar
                                            ? (
                                                <div className="error-message">
                                                    <CloseCircleIcon />
                                                    {errors.aadhar.message}
                                                </div>
                                            )
                                            : null
                                    }
                                </div>
                                <div className="field flex-1">
                                    <label htmlFor="pan" className="label">Pan no</label>
                                    <input 
                                        className="input is-small" 
                                        type="text" 
                                        id="pan"
                                        {
                                            ...register('pan', {
                                                value: currentUser.pan
                                            })
                                        }
                                    />
                                    {
                                        errors.pan
                                            ? (
                                                <div className="error-message">
                                                    <CloseCircleIcon />
                                                    {errors.pan.message}
                                                </div>
                                            )
                                            : null
                                    }
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="pincode" className="label">Pincode</label>
                                <input 
                                    className="input is-small" 
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
                                        ? (
                                            <div className="error-message">
                                                <CloseCircleIcon />
                                                {errors.pincode.message}
                                            </div>
                                        )
                                        : null
                                }
                            </div>
                            <div className="field">
                                <label htmlFor="mob" className="label">Mobile No</label>
                                <input 
                                    className="input is-small" 
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
                                        ? (
                                            <div className="error-message">
                                                <CloseCircleIcon />
                                                {errors.phone.message}
                                            </div>
                                        )
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