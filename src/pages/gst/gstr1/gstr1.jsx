import { Link } from "react-router-dom";
import CashTransactionIcon from "../../../components/icons/CashTransactionIcon.jsx";
import CheckCircleIcon from "../../../components/icons/CheckCircleIcon.jsx";
import RupeeIcon from "../../../components/icons/RupeeIcon.jsx";
import CloseCircleIcon from "../../../components/icons/CloseCircleIcon.jsx";
import useAuth from "../../../hooks/useAuth.js"
import Sidebar from "../../../components/Sidebar.jsx";
import Topbar from "../../../components/Topbar.jsx";
import React, { useContext, useState } from 'react'
import axios from "axios";
import { BASE_URL } from "../../../constants.js";
import { useRef } from "react";
import ArrowLeftIcon from "../../../components/icons/ArrowLeftIcon.jsx";
import ArrowRightIcon from "../../../components/icons/ArrowRightIcon.jsx";
import PasswordIcon from "../../../components/icons/PasswordIcon.jsx";
import UploadIcon from "../../../components/icons/UploadIcon.jsx";
import DownloadIcon from "../../../components/icons/DownloadIcon.jsx";
import BookIcon from "../../../components/icons/BookIcon.jsx";
import FileTransferIcon from "../../../components/icons/FileTransferIcon.jsx";
import { getMonthsByCurrentQuarter, getMonthsByPreviousQuarter, MONTHS } from "../../../lib/time-period.js";
import Modal from "../../../components/Modal.jsx";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../../components/messages/ErrorMessage.jsx";
import { GSTIN_RGX } from "../../../lib/validation.js";
import { StoreContext } from "../../../store/store-context.js";
import { GST_LOGIN, SET_GST_MONTH, SET_GST_YEAR } from "../../../store/actions.js";

export default function GSTR1() {
    const { token } = useAuth();
    const [state, dispatch] = useContext(StoreContext);

    const [open, setOpen] = React.useState(false);
    
    const [signinIn, setSigningIn] = useState(false);
    const [error, setError] = useState('');
    const [showhide, setShowHide] = useState("login");

    const [type, setType] = useState('regular');
    const [period2, setPeriod2] = useState('monthly');

    const [gstin, setGstin] = useState('');
    const [username, setUsername] = useState('');
    const [otp, setOtp] = useState('');

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setGstin('');
        setUsername('');
    };

    const setMonth = month => {
        dispatch({
            type: SET_GST_MONTH,
            payload: month
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setSigningIn(true);

            setError('');

            if(!gstin || !username) {
                throw new Error('GSTIN and Username cannot be empty.');
            }

            const response = await fetch(`${BASE_URL}/gsp/gst/tax-payer/generate-otp`, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify({
                    // gstin: "23BNJPS3408M1ZP",
                    // gst_portal_username: "newsethielectri"
                    gstin,
                    username
                })
            });

            const data = await response.json();

            console.log(data);
        } catch (e) {
            console.error(e);
            setError(e.message);
        } finally {
            setSigningIn(false);
            setShowHide("verify");
        }

    };
    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            setSigningIn(true);

            setError('');

            if(!otp) {
                throw new Error('OTP cannot be empty.');
            }

            const response = await fetch(`${BASE_URL}/gsp/gst/tax-payer/verify-otp`, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify({
                    gstin,
                    gst_portal_username: username,
                    otp
                })
            });

            if(!response.ok) {
                throw new Error(`Couldn't Verify.`);
            }

            const data = await response.json();

            const gstRequest = await fetch(`${BASE_URL}/gsp/search/gstin?gstin=${gstin}`, {
                'Authorization': `Bearer ${token}`,
            });

            if(!gstRequest.ok) {
                throw new Error(`Couldn't login. Please try again.`);
            }

            const { company } = await gstRequest.json();

            dispatch({
                type: GST_LOGIN,
                payload: {
                    party_name: company.lgnm,
                    gstin,
                    username,
                }
            });
            
            setOpen(false);
        } catch (e) {
            console.error(e);
            setError(e.message);
        } finally {
            setSigningIn(false);
            setShowHide("Howdy")
        }
    }

    const handleType = e => {
        const value = e.target.value;

        setType(value);

        if(value === 'composition') {
            setPeriod2('yearly');
        } else {
            setPeriod2('monthly');
        }
    };

    const handlePeriod2 = e => {
        const period = e.target.value;

        setPeriod2(period);
        
        if(period === 'monthly') {
            setMonth(1);
        } else {
            const prevQuarter = getMonthsByPreviousQuarter();

            const first = prevQuarter[0];

            setMonth(first.i + 1);
        }
    };

    const handleMonth = e => {
        const month = parseInt(e.target.value) + 1;

        console.log(month);

        setMonth(month);
    };

    const handleYearChange = e => {
        dispatch({
            type: SET_GST_YEAR,
            payload: e.target.value
        })
    };

    return (
        <div className="container">
            <Sidebar open={false} />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    {
                        state.gst.isLoggedIn
                            ? (
                                <h6 className="text-secondary">
                                    Logged in as <span className="text-primary">{state.gst.party_name}</span>
                                </h6>
                            )
                            : null
                    }
                    <div className="flex jc-between ai-center flex-wrap g-1rem">
                        <div className="flex dir-col g-1rem">
                            <Link to="/gst/outward-supplies" className="button is-primary is-small has-icon">
                                <ArrowLeftIcon />
                                Outward Supplies Liability (GSTR-1)
                            </Link>
                            <Link to="/gst/inward-supplies" className="button is-primary is-small has-icon">
                                <ArrowRightIcon />
                                Inward Supplies Credit (GSTR-2)
                            </Link>
                        </div>
                        <div className="flex dir-col g-1rem">
                            {showhide === "Howdy" 
                                ? <button className="button is-primary is-small" >Howdy!</button> 
                                : (
                                    <button className="button is-primary is-small has-icon" onClick={handleOpen}>
                                        <PasswordIcon />
                                        GST Login
                                    </button>
                                )
                            }
                            <button className="button is-primary is-small has-icon">
                                <UploadIcon />
                                Import Data
                            </button>
                        </div>
                    </div>
                        <div className="section p-0">
                            <div className="flex g-1rem ai-center p-1rem">
                                <select
                                    onChange={handleType} 
                                    className="select w-max-content"
                                    value={type}
                                >
                                    <option value="regular">Regular</option>
                                    <option value="composition">Composition</option>
                                </select>
                                <select 
                                    onChange={handlePeriod2} 
                                    className="select w-max-content"
                                    value={period2}
                                >
                                    {
                                        type === 'regular'
                                            ? (
                                                <>
                                                    <option value="monthly">Monthly</option>
                                                    
                                                </>
                                            )
                                            : null
                                    }
                                    <option value="quarterly">Quarterly</option>
                                </select>
                                <select name="c" className="select w-max-content">
                                    {
                                        type === 'regular'
                                            ? (
                                                <>
                                                    <option value="gstr1">GSTR1</option>
                                                    <option value="gstr3b">GSTR3B</option>
                                                </>
                                            )
                                            : (
                                                <option value="gstr4">GSTR4</option>
                                            )
                                    }
                                </select>
                                {
                                    type === 'regular'
                                        ? (
                                            <select onChange={handleMonth} value={state.gst.month - 1} className="select w-max-content">
                                                {
                                                    period2 === 'monthly'
                                                        ? MONTHS.map((month, i) => {
                                                            return <option key={month} value={i}>{month}</option>;
                                                        })
                                                        : getMonthsByPreviousQuarter().map(({ month, i }) => {
                                                            return <option key={month} value={i}>{month}</option>;
                                                        })
                                                }
                                            </select>
                                        )
                                        : null
                                }
                                <select
                                    onChange={handleYearChange} 
                                    className="select w-max-content"
                                    value={state.gst.year}
                                >
                                    <option value="2020">2020-21</option>
                                    <option value="2021">2021-22</option>
                                    <option value="2023">2022-23</option>
                                    <option value="2024">2023-24</option>
                                </select>
                            </div>
                            {/* <table>
                                <thead>
                                    <tr>
                                        <th>GSTR1 Sale</th>
                                        <th>Jan 2022</th>
                                        <th>Feb 2022</th>
                                        <th>Mar 2022</th>
                                    </tr>
                                </thead>
                            </table> */}
                            <div className="scrollable">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Ledger Balance</th>
                                            <th>IGST</th>
                                            <th>CGST</th>
                                            <th>SGST</th>
                                            <th>CESS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>Electronic Liability Register</th>
                                            <td>
                                                <input type="text" className="input is-small" />
                                            </td>
                                            <td>
                                                <input type="text" className="input is-small" />
                                            </td>
                                            <td>
                                                <input type="text" className="input is-small" />
                                            </td>
                                            <td>
                                                <input type="text" className="input is-small" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Electronic Cash Ledger</th>
                                            <td>
                                                <input type="text" className="input is-small" />
                                            </td>
                                            <td>
                                                <input type="text" className="input is-small" />
                                            </td>
                                            <td>
                                                <input type="text" className="input is-small" />
                                            </td>
                                            <td>
                                                <input type="text" className="input is-small" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Electronic Credit Ledger</th>
                                            <td>
                                                <input type="text" className="input is-small" />
                                            </td>
                                            <td>
                                                <input type="text" className="input is-small" />
                                            </td>
                                            <td>
                                                <input type="text" className="input is-small" />
                                            </td>
                                            <td>
                                                <input type="text" className="input is-small" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>TDS/TCS</th>
                                            <td>
                                                <input type="text" className="input is-small" />
                                            </td>
                                            <td>
                                                <input type="text" className="input is-small" />
                                            </td>
                                            <td>
                                                <input type="text" className="input is-small" />
                                            </td>
                                            <td>
                                                <input type="text" className="input is-small" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex p-1rem jc-between">
                                <div className="flex g-1rem flex-wrap">
                                    <Link to="/gst/gstr1/ledger" className="button is-primary is-small has-icon">
                                        <BookIcon />
                                        Ledger
                                    </Link>
                                    <button className="button is-primary is-small has-icon">
                                        <RupeeIcon />
                                        Liability
                                    </button>
                                    <button className="button is-primary is-small has-icon">
                                        <RupeeIcon />
                                        Credit
                                    </button>
                                    <button className="button is-primary is-small has-icon">
                                        <FileTransferIcon />
                                        File Return
                                    </button>
                                </div>
                                <button className="button is-primary has-icon is-small">
                                    <CheckCircleIcon />
                                    Pay Tax
                                </button>
                            </div>
                        </div>
                </div>
            </div>
            <Modal
                open={open}
                setOpen={setOpen}
                onClose={handleClose}
            >
                {showhide === "login" && (
                        <div className="login-box">
                            <form className="flex dir-col g-1rem" onSubmit={handleLogin}>
                                <h5>GST Login</h5>
                                <div className="field">
                                    <label htmlFor="gstin" className="label">GSTIN</label>
                                    <input
                                        type="text"
                                        className="input"
                                        id="gstin"
                                        name="gstin"
                                        placeholder="GSTIN"
                                        autoComplete="gstin"
                                        onChange={e => setGstin(e.target.value)}
                                        value={gstin}
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="username" className="label">GST Portal Username</label>
                                    <input
                                        type="text"
                                        className="input"
                                        id="username"
                                        name="username"
                                        placeholder="Portal Username"
                                        autoComplete="gst-username"
                                        onChange={e => setUsername(e.target.value)}
                                        value={username}
                                    />
                                </div>
                                {
                                    error
                                        ? (
                                            <ErrorMessage message={error} />
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
                    )

                    }
                    {showhide === "verify" && (
                        <div className="login-box">
                            <form className="flex dir-col g-1rem" onSubmit={handleVerify}>
                                <p>Enter OTP Sent On Your Mobile</p>
                                <div className="field">
                                    <input
                                        type="text"
                                        className="input"
                                        name="otp"
                                        onChange={e => setOtp(e.target.value)}
                                        value={otp}
                                        id="otp"
                                        placeholder="Enter OTP"
                                        autoComplete="off"
                                        required
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
                                        signinIn
                                            ? <span className="spinner small"></span>
                                            : 'Verify'
                                    }
                                </button>
                            </form>
                        </div>
                    )}

            </Modal>
        </div>
    )
}