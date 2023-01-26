import { Alert, Box, Modal } from "@mui/material";
import { Link } from "react-router-dom";
import CashTransactionIcon from "../../../components/icons/CashTransactionIcon.jsx";
import CheckCircleIcon from "../../../components/icons/CheckCircleIcon.jsx";
import RupeeIcon from "../../../components/icons/RupeeIcon.jsx";
import CloseCircleIcon from "../../../components/icons/CloseCircleIcon.jsx";
import useAuth from "../../../hooks/useAuth.js"
import Sidebar from "../../../components/Sidebar.jsx";
import Topbar from "../../../components/Topbar.jsx";
import React, { useState } from 'react'
import axios from "axios";
import { BASE_URL } from "../../../constants.js";
import { useRef } from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


export default function GSTR1() {
    const handleSubmit = e => {
        e.preventDefault();
    };
    const { token } = useAuth();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [signinIn, setSigningIn] = useState(false);
    const [error, setError] = useState('');
    const [showhide, setShowHide] = useState("login");
    const otpRef = useRef("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setSigningIn(true);

            setError('');
            const response = await fetch(`${BASE_URL}/gsp/gst/tax-payer/generate-otp`, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify({
                    gstin: "23BNJPS3408M1ZP",
                    gst_portal_username: "newsethielectri"
                })
            });

            const data = await response.json();

            console.log(data);
        } catch (e) {
            console.error(e);
            setError(e.message);
        } finally {

            setSigningIn(false);
            setShowHide("verify")
        }

    };
    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            setSigningIn(true);

            setError('');
            const response = await fetch(`${BASE_URL}/gsp/gst/tax-payer/verify-otp`, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify({
                    gstin: "23BNJPS3408M1ZP",
                    gst_portal_username: "newsethielectri",
                    otp: otpRef.current.value
                })
            });

            const data = await response.json();

            console.log(data);
        } catch (e) {
            console.error(e);
            setError(e.message);
        } finally {

            setSigningIn(false);
            setShowHide("Howdy")
            window._loginauthkey = "gstloginAuth"
        }
    }

    const handleLadgers = async (e) => {
        e.preventDefault();

        console.log("run")

        if (window._loginauthkey = "gstloginAuth") {
            // const responce = await axios(`${BASE_URL}/taxes/get-itc-chash-ledgers?gstin=23BNJPS3408M1ZP&from=20/05/2022&to=30/10/2022`,{
            //     headers: new Headers({
            //         'Authorization': `Bearer ${token}`,
            //         'Content-Type': 'application/json',
            //     }),
            // })

            //     .then(function (response) {
            //     // handle success
            //     console.log(response);
            // })
            //         .catch(function (error) {
            //             // handle error
            //             console.log(error);
            //         })
            try {
                setSigningIn(true);

                setError('');
                const response = await fetch(`${BASE_URL}/taxes/get-itc-chash-ledgers?gstin=23BNJPS3408M1ZP&from=20/05/2022&to=30/10/2022`, {
                    method: 'get',
                    headers: new Headers({
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }),

                });

                const data = await response.json();

                console.log(data);
            } catch (e) {
                console.error(e);
                setError(e.message);
            } finally {


            }






        } else {
            alert("not"),
                <Alert severity="error">Please Login With GST Account!</Alert>
        }
    }

    return (
        <div className="container">
            <Sidebar open={false} />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    <div className="flex jc-between ai-center flex-wrap g-1rem">
                        <div className="flex dir-col g-1rem">
                            <Link to="/gst/outward-supplies" className="button is-primary is-small ">Outward Supplies Liability (GSTR-1)</Link>
                            <Link to="/gst/inward-supplies" className="button is-primary is-small">Inward Supplies Credit (GSTR-2)</Link>
                        </div>
                        <div className="flex dir-col g-1rem">

                            {showhide === "Howdy" ? <button className="button is-primary is-small" >Howdy!</button> : <button className="button is-primary is-small" onClick={handleOpen}>GST Login</button>}
                            <button className="button is-primary is-small">Import Data</button>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="section p-0">
                            <div className="flex g-1rem ai-center p-1rem">
                                <select name="a" className="select w-max-content">
                                    <option value="regular">Regular</option>
                                    <option value="composition">Composition</option>
                                </select>
                                <select name="b" className="select w-max-content">
                                    <option value="monthly">Monthly</option>
                                    <option value="quarterly">Quarterly</option>
                                    <option value="yearly">Yearly</option>
                                </select>
                                <select name="c" className="select w-max-content">
                                    <option value="gstr1">GSTR1</option>
                                    <option value="gstr3b">GSTR3B</option>
                                    <option value="gstr4">GSTR4</option>
                                </select>
                                <select name="d" className="select w-max-content" onChange={handleLadgers}>
                                    <option value="January">January </option>
                                    <option value="February">February </option>
                                    <option value="March">March </option>
                                    <option value="April">April </option>
                                    <option value="May">May  </option>
                                    <option value="June">June </option>
                                    <option value="July">July  </option>
                                    <option value="August">August  </option>
                                    <option value="September">September  </option>
                                    <option value="October">October  </option>
                                    <option value="November">November </option>
                                    <option value="December">December  </option>
                                </select>
                                <select name="e" className="select w-max-content">
                                    <option value="gstr1">2020-21</option>
                                    <option value="gstr3b">2022-23</option>
                                    <option value="gstr4">2023-24</option>
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
                                                <input type="text" className="input" />
                                            </td>
                                            <td>
                                                <input type="text" className="input" />
                                            </td>
                                            <td>
                                                <input type="text" className="input" />
                                            </td>
                                            <td>
                                                <input type="text" className="input" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Electronic Cash Ledger</th>
                                            <td>
                                                <input type="text" className="input" />
                                            </td>
                                            <td>
                                                <input type="text" className="input" />
                                            </td>
                                            <td>
                                                <input type="text" className="input" />
                                            </td>
                                            <td>
                                                <input type="text" className="input" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Electronic Credit Ledger</th>
                                            <td>
                                                <input type="text" className="input" />
                                            </td>
                                            <td>
                                                <input type="text" className="input" />
                                            </td>
                                            <td>
                                                <input type="text" className="input" />
                                            </td>
                                            <td>
                                                <input type="text" className="input" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>TCS</th>
                                            <td>
                                                <input type="text" className="input" />
                                            </td>
                                            <td>
                                                <input type="text" className="input" />
                                            </td>
                                            <td>
                                                <input type="text" className="input" />
                                            </td>
                                            <td>
                                                <input type="text" className="input" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex p-1rem jc-between">
                                <div className="flex g-1rem flex-wrap">
                                    <Link to="/gst/gstr1/ledger" className="button is-primary is-small ">Ledger</Link>
                                    <button className="button is-primary is-small ">Liability</button>
                                    <button className="button is-primary is-small ">Credit</button>
                                    <button className="button is-primary is-small ">File Return</button>
                                </div>
                                <button className="button is-primary has-icon is-small">
                                    <CheckCircleIcon />
                                    Pay Tax
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {showhide === "login" && (
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
                                    <input
                                        type="password"
                                        className="input"
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        autoComplete="current-password"
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
                                            : 'Login'
                                    }
                                </button>
                            </form>
                            <p className="text-secondary">
                                &copy; ITaxEasy Pvt Ltd
                            </p>
                        </div>
                    )

                    }
                    {showhide === "verify" && (
                        <div className="login-box">
                            <form className="flex dir-col g-1rem" onSubmit={handleVerify}>
                                <p>Verify OTP Given Your Mobile</p>
                                <div className="field">
                                    <input
                                        type="text"
                                        className="input"
                                        name="otp"
                                        id="otp"
                                        placeholder="Enter OTP"
                                        autoComplete="off"
                                        ref={otpRef}
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
                            <p className="text-secondary">
                                &copy; ITaxEasy Pvt Ltd
                            </p>
                        </div>
                    )}





                </Box>
            </Modal>
        </div>
    )
}