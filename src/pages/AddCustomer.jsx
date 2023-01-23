import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";
import { BASE_URL } from "../constants.js";
import useAuth from "../hooks/useAuth.js";
import useMultiStepForm from "../hooks/useMultiStepForm.js";

const ENDPOINT = `${BASE_URL}/cms/create-customer`;

const PersonalInfoForm = ({ formState, onChange, next }) => {
    return (
        <div className="flex dir-col g-1rem">
            <div className="flex g-1rem ai-center flex-wrap">
                <div className="field">
                    <label htmlFor="fname" className="label">First Name</label>
                    <input 
                        type="text" 
                        name="fname" 
                        id="fname" 
                        className="input" 
                        value={formState.fname}
                        onChange={onChange}
                    />
                </div>
                <div className="field">
                    <label htmlFor="lname" className="label">Last Name</label>
                    <input 
                        type="text" 
                        name="lname" 
                        id="lname" 
                        className="input" 
                        value={formState.lname}
                        onChange={onChange}
                    />
                </div>
            </div>
            <div className="field">
                <label htmlFor="dob" className="label">DOB</label>
                <input 
                    type="date" 
                    name="dob" 
                    id="dob" 
                    className="input" 
                    value={formState.dob}
                    onChange={onChange}
                />
            </div>
            <div className="field">
                <label htmlFor="email" className="label">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    className="input" 
                    value={formState.email}
                    onChange={onChange}
                />
            </div>
            <div className="field">
                <label htmlFor="mobile" className="label">Mobile No.</label>
                <input 
                    type="tel" 
                    name="mobile" 
                    id="mobile" 
                    className="input" 
                    value={formState.mobile}
                    onChange={onChange}
                />
            </div>
            <div className="field">
                <label htmlFor="pan" className="label">Pan No.</label>
                <input 
                    type="text" 
                    name="pan" 
                    id="pan" 
                    className="input" 
                    value={formState.pan}
                    onChange={onChange}
                />
            </div>
            <div className="field">
                <label htmlFor="aadhar" className="label">Aadhaar No.</label>
                <input 
                    type="text" 
                    name="aadhar" 
                    id="aadhar" 
                    className="input" 
                    value={formState.aadhar}
                    onChange={onChange}
                />
            </div>
            <div className="field">
                <label htmlFor="address" className="label">Address</label>
                <textarea 
                    name="address" 
                    id="address" 
                    className="input" 
                    value={formState.address}
                    onChange={onChange}
                ></textarea>
            </div>
            <button onClick={next} type="button" className="button is-primary">Save and Next</button>
        </div>
    )
};

const CompanyInfoForm = ({ formState, onChange, next }) => {
    return (
        <div className="flex dir-col g-1rem">
            <div className="field">
                <label htmlFor="businessName" className="label">Business Name</label>
                <input 
                    type="text" 
                    name="businessName" 
                    id="businessName" 
                    className="input" 
                    value={formState.businessName}
                    onChange={onChange}
                />
            </div>
            <div className="field">
                <label htmlFor="website" className="label">Website</label>
                <input 
                    type="url" 
                    name="website" 
                    id="website" 
                    className="input" 
                    value={formState.website}
                    onChange={onChange}
                />
            </div>
            <div className="field">
                <label htmlFor="businessEmail" className="label">Email</label>
                <input 
                    type="email" 
                    name="businessEmail" 
                    id="businessEmail" 
                    className="input" 
                    value={formState.businessEmail}
                    onChange={onChange}
                />
            </div>
            <div className="field">
                <label htmlFor="businessMobile" className="label">Mobile No.</label>
                <input 
                    type="tel" 
                    name="businessMobile" 
                    id="businessMobile" 
                    className="input" 
                    value={formState.businessMobile}
                    onChange={onChange}
                />
            </div>
            <div className="field">
                <label htmlFor="businessAddress" className="label">Address</label>
                <textarea 
                    name="businessAddress" 
                    id="businessAddress" 
                    className="input" 
                    value={formState.businessAddress}
                    onChange={onChange}
                ></textarea>
            </div>
            <button onClick={next} className="button is-primary">Save and Next</button>
        </div>
    )
};

const BankInfoForm = ({ adding, formState, onChange }) => {
    return (
        <div className="flex dir-col g-1rem">
            <div className="field">
                <label htmlFor="bankName" className="label">Bank Name</label>
                <input 
                    type="text" 
                    name="bankName" 
                    id="bankName" 
                    className="input" 
                    value={formState.bankName}
                    onChange={onChange}
                />
            </div>
            <div className="field">
                <label htmlFor="ifsc" className="label">Bank IFSC Code</label>
                <input 
                    type="text" 
                    name="ifsc" 
                    id="ifsc" 
                    className="input" 
                    value={formState.ifsc}
                    onChange={onChange}
                />
            </div>
            <div className="field">
                <label htmlFor="bankAccountNo" className="label">Bank Account no</label>
                <input 
                    type="text" 
                    name="bankAccountNo" 
                    id="bankAccountNo" 
                    className="input" 
                    value={formState.bankAccountNo}
                    onChange={onChange}
                />
            </div>
            <button disabled={adding} className="button is-primary">
                {
                    adding
                        ? <span className="spinner small"></span>
                        : 'Add Customer'
                }
            </button>
        </div>
    )
};

export default function AddCustomer() {
    const { token } = useAuth();
    const [adding, setAdding] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const { currentStep, next, setStep, prev, formState, onChange } = useMultiStepForm({
        fname: '',
        lname: '',
        dob: '',
        email: '',
        mobile: '',
        pan: '',
        aadhar: '',
        businessName: '',
        businessEmail: '',
        businessAddress: '',
        bankName: '',
        ifsc: '',
        bankAccountNo: '',  
    });

    const tabs = [
        { step: 0, name: 'Personal Info' },
        { step: 1, name: 'Company Info' },
        { step: 2, name: 'Bank Details' }
    ];

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            setAdding(true);
            setError('');

            const response = await fetch(
                ENDPOINT,
                {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }),
                    body: JSON.stringify(formState)
                }
            );

            const { message } = await response.json();

            if(!response.ok) {
                throw new Error(message);
            }

            setSuccess('Customer Added');
        } catch(e) {
            console.error(e);
            setError(e.message);
        } finally {
            setAdding(false);
        }
    };

    const steps = [
        <PersonalInfoForm 
            next={next}
            formState={formState} 
            onChange={onChange} 
        />,
        <CompanyInfoForm
            next={next}
            formState={formState} 
            onChange={onChange} 
        />,
        <BankInfoForm
            adding={adding}
            handleSubmit={handleSubmit} 
            formState={formState} 
            onChange={onChange} 
        />
    ];

    return (
        <div className="container">
            <Sidebar />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    {
                        success
                            ? (
                                <div className="success-message">{success}</div>
                            )
                            : (
                                <div className="section">
                                    <div className="tabs">
                                        {
                                            tabs.map(({ step, name }) => {
                                                return (
                                                    <button
                                                        key={step}
                                                        onClick={() => setStep(step)}
                                                        className={`button tab${step === currentStep ? ' active' : ''}`}
                                                    >{name}</button>
                                                )
                                            })
                                        }
                                    </div>
                                    {
                                        error
                                            ? <div className="error-message">{error}</div>
                                            : null
                                    }
                                    <form onSubmit={handleSubmit}>
                                        {
                                            steps[currentStep]
                                        }
                                    </form>
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    )
}