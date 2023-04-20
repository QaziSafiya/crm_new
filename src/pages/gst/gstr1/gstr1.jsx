import { Link } from "react-router-dom";
import CashTransactionIcon from "../../../components/icons/CashTransactionIcon.jsx";
import CheckCircleIcon from "../../../components/icons/CheckCircleIcon.jsx";
import RupeeIcon from "../../../components/icons/RupeeIcon.jsx";
import CloseCircleIcon from "../../../components/icons/CloseCircleIcon.jsx";
import useAuth from "../../../hooks/useAuth.js";
import Sidebar from "../../../components/Sidebar.jsx";
import Topbar from "../../../components/Topbar.jsx";
import React, { useContext, useState } from "react";
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
import {
  getMonthsByCurrentQuarter,
  getMonthsByPreviousQuarter,
  MONTHS,
} from "../../../lib/time-period.js";
import Modal from "../../../components/Modal.jsx";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../../components/messages/ErrorMessage.jsx";
import { GSTIN_RGX } from "../../../lib/validation.js";
import { StoreContext } from "../../../store/store-context.js";
import {
  GST_LOGIN,
  SET_GST_MONTH,
  SET_GST_QUARTER,
  SET_GST_YEAR,
} from "../../../store/actions.js";

export default function GSTR1() {
  const { token } = useAuth();
  const [state, dispatch] = useContext(StoreContext);

  const [open, setOpen] = React.useState(false);

  const [signinIn, setSigningIn] = useState(false);
  const [error, setError] = useState("");
  const [showhide, setShowHide] = useState("login");

  const [type, setType] = useState("regular");
  const [period, setPeriod] = useState(undefined);

  const [gstin, setGstin] = useState("");
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");

  const currentQuarter = getMonthsByCurrentQuarter(state.gst.quarter);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setGstin("");
    setUsername("");
  };

  const setQuarter = (quarter) => {
    dispatch({
      type: SET_GST_QUARTER,
      payload: quarter,
    });
  };

  const setMonth = (month) => {
    dispatch({
      type: SET_GST_MONTH,
      payload: month,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setSigningIn(true);

      setError("");

      if (!gstin || !username) {
        throw new Error("GSTIN and Username cannot be empty.");
      }

      const response = await fetch(
        `${BASE_URL}/gsp/gst/tax-payer/generate-otp`,
        {
          method: "POST",
          headers: new Headers({
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({
            // gstin: "23BNJPS3408M1ZP",
            // gst_portal_username: "newsethielectri"
            gstin,
            username,
          }),
        }
      );

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

      setError("");

      if (!otp) {
        throw new Error("OTP cannot be empty.");
      }

      const response = await fetch(`${BASE_URL}/gsp/gst/tax-payer/verify-otp`, {
        method: "POST",
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          gstin,
          gst_portal_username: username,
          otp,
        }),
      });

      if (!response.ok) {
        throw new Error(`Couldn't Verify.`);
      }

      const data = await response.json();

      const gstRequest = await fetch(
        `${BASE_URL}/gsp/search/gstin?gstin=${gstin}`,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!gstRequest.ok) {
        throw new Error(`Couldn't login. Please try again.`);
      }

      const { company } = await gstRequest.json();

      dispatch({
        type: GST_LOGIN,
        payload: {
          party_name: company.lgnm,
          gstin,
          username,
        },
      });

      setOpen(false);
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setSigningIn(false);
      setShowHide("Howdy");
    }
  };

  const handleType = (e) => {
    const value = e.target.value;

    setType(value);

    // if (value === "composition") {
    //   setPeriod("yearly");
    // } else {
    //   setPeriod("monthly");
    // }
  };

  const handlePeriod = (e) => {
    const quarter = Number(e.target.value);

    setPeriod(quarter);

    // if (period === "monthly") {
    //   setMonth(1);
    // } else {
    // const prevQuarter = getMonthsByPreviousQuarter();

    // const first = prevQuarter[0];
    setQuarter(quarter);
  };

  const handleMonth = (e) => {
    const month = parseInt(e.target.value);
    setMonth(month);
  };

  const handleYearChange = (e) => {
    dispatch({
      type: SET_GST_YEAR,
      payload: e.target.value,
    });
  };

  return (
    <div className="container">
      <Sidebar open={false} />
      <div className="main">
        <Topbar />
        <div className="inner-container">
          {/* inner-container */}
          {state.gst.isLoggedIn ? (
            <h6 className="text-secondary">
              Logged in as{" "}
              <span className="text-primary">{state.gst.party_name}</span>
            </h6>
          ) : null}
          <div className="flex jc-between ai-center flex-wrap g-1rem">
            {/* <div className="flex dir-col g-1rem">
                            <Link to="/gst/outward-supplies" className="button is-primary is-small has-icon">
                                <ArrowLeftIcon />
                                Outward Supplies Liability (GSTR-1)
                            </Link>
                            <Link to="/gst/inward-supplies" className="button is-primary is-small has-icon">
                                <ArrowRightIcon />
                                Inward Supplies Credit (GSTR-2)
                            </Link>
                        </div> */}
            {/* <div className="flex dir-col g-1rem">
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
                        </div> */}
          </div>

          <div className="flex g-1rem">
            <div className="flex dir-col mini-container g-1rem">
              <div className="flex dir-col g-1rem">
                {showhide === "Howdy" ? (
                  <button className="button is-primary is-small">Howdy!</button>
                ) : (
                  <button
                    className="button is-primary is-small has-icon"
                    onClick={handleOpen}
                  >
                    <PasswordIcon />
                    GST Login
                  </button>
                )}
                <button className="button is-primary is-small has-icon">
                  <UploadIcon />
                  Import Data
                </button>
              </div>

              {type === "regular" ? (
                <div
                  className="flex outline dir-col g-2rem margin-y"
                  style={{ "--margin-y": "2.5rem" }}
                >
                  <div className="flex jc-between ai-center g-1rem">
                    <Link
                      to="/gst/outward-supplies"
                      className="button is-primary is-small has-icon flex-1"
                    >
                      <ArrowLeftIcon />
                      {/* Outward Supplies Liability (GSTR-1) */}
                      Sales (GSTR-1)
                    </Link>
                    <span className="text-bold">(A)</span>
                  </div>
                  <div className="flex jc-between ai-center g-1rem">
                    <Link
                      to="/gst/inward-supplies"
                      className="button is-primary is-small has-icon flex-1"
                    >
                      <ArrowRightIcon />
                      {/* Inward Supplies Credit (GSTR-2) */}
                      Purchase (GSTR-2)
                    </Link>
                    <span className="text-bold">(B)</span>
                  </div>
                  <div className="flex py-0_5 jc-between ai-center">
                    <span className="">Utilized ITC Balance:</span>
                    <span className="text-bold">(C)</span>
                  </div>
                  <div className="flex py-0_5 jc-between ai-center">
                    <span>Net Tax Liability on Outward Supply: (A-C):</span>
                    <span className="text-bold">(D)</span>
                  </div>
                  <div className="flex jc-between ai-center">
                    <span>
                      <span className="text-small">Add: </span>
                      Tax Liability on Inward Supply:
                    </span>
                    <span className="text-bold">(E)</span>
                  </div>
                  <div className="flex py-0_25 jc-between ai-center">
                    <span className="text-bold">
                      Total Tax Payable in Cash: (D+E)
                    </span>
                    <span className="text-bold">(F)</span>
                  </div>
                  <div className="flex py-0_5 jc-between ai-center">
                    <span>
                      <span className="text-small">Less: </span>
                      Utilized Cash Balance:
                    </span>
                    <span className="text-bold">(G)</span>
                  </div>
                  <div className="flex py-0_5 jc-between ai-center">
                    <span className="text-bold">Balance GST Due: (F-G)</span>
                    <span className="text-bold">(H)</span>
                  </div>
                </div>
              ) : (
                <div
                  className="flex outline dir-col g-2rem margin-y"
                  style={{ "--margin-y": "2.5rem" }}
                >
                  <div className="flex jc-between ai-center g-1rem">
                    <Link
                      to="/gst/outward-supplies"
                      className="button is-primary is-small has-icon flex-1"
                    >
                      <ArrowLeftIcon />
                      {/* Outward Supplies Liability (GSTR-1) */}
                      Sales (GSTR-1)
                    </Link>
                    <span className="text-bold">(A)</span>
                  </div>
                  <div className="flex jc-between ai-center g-1rem">
                    <Link
                      to="/gst/inward-supplies"
                      className="button is-primary is-small has-icon flex-1"
                    >
                      <ArrowRightIcon />
                      {/* Inward Supplies Credit (GSTR-2) */}
                      Purchase (GSTR-2)
                    </Link>
                    <span className="text-bold">(B)</span>
                  </div>
                  <div className="flex py-0_75 jc-between ai-center">
                    <span className="">Total Tax Liability: (A+B)</span>
                    <span className="text-bold">(C)</span>
                  </div>
                  <div className="flex py-0_75 jc-between ai-center">
                    <span>Less: TDS Credit Received</span>
                    <span className="text-bold">(D)</span>
                  </div>
                  <div className="flex py-0_75 jc-between ai-center">
                    <span>Net Tax Liability: (C-D)</span>
                    <span className="text-bold">(E)</span>
                  </div>
                  <div className="flex py-0_75 jc-between ai-center">
                    <span className="text-bold">
                      <span className="text-small">Less: </span> Tax Paid in
                      Cash:
                    </span>
                    <span className="text-bold">(F)</span>
                  </div>
                  <div className="flex py-0_75 jc-between ai-center">
                    <span className="text-bold">Balance GST Due: (E-F)</span>
                    <span className="text-bold">(G)</span>
                  </div>
                </div>
              )}
            </div>
            <div className="section small-container p-0">
              <div className="flex g-1rem ai-center p-1rem">
                <select
                  onChange={handleType}
                  className="select w-max-content"
                  value={type}
                >
                  <option value="regular">Regular</option>
                  <option value="composition">Composition</option>
                </select>
                <select name="c" className="select w-max-content">
                  {type === "regular" ? (
                    <>
                      <option value="gstr1">GSTR1</option>
                      <option value="gstr2a">GSTR2A</option>
                      <option value="gstr3b">GSTR3B</option>
                    </>
                  ) : (
                    <>
                      <option value="cmp_80">CMP-80</option>
                      <option value="gstr4a">GSTR4A</option>
                    </>
                  )}
                </select>
                <select
                  onChange={handlePeriod}
                  className="select w-max-content"
                  value={period}
                >
                  <option hidden selected>
                    --Quarter--
                  </option>
                  <option value="1">Apr-June</option>
                  <option value="2">Jul-Sep</option>
                  <option value="3">Oct-Dec</option>
                  <option value="0">Jan-Mar</option>
                </select>
                <select
                  onChange={(e) => handleMonth(e)}
                  value={state.gst.month}
                  className="select w-max-content"
                >
                  <option hidden selected>
                    --Period--
                  </option>
                  {
                    // period2 === "monthly"
                    //   ? MONTHS.map((month, i) => {
                    //       return (
                    //         <option key={month} value={i}>
                    //           {month}
                    //         </option>
                    //       );
                    //   }) :
                    type === "regular"
                      ? currentQuarter.map(
                          ({ month, i }) => {
                            return (
                              <option key={month} value={i}>
                                {month}
                              </option>
                            );
                          }
                        )
                      : (
                        <option value={currentQuarter[currentQuarter.length-1].i}>
                          {currentQuarter[currentQuarter.length - 1].month}
                        </option>
                      )
                  }
                </select>
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
                      <th>Supply Value</th>
                      <th>IGST</th>
                      <th>CGST</th>
                      <th>SGST</th>
                      <th>CESS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>{/* Electronic Liability Register */}</th>
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
                      <th>{/* Electronic Cash Ledger */}</th>
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
                      <th>{/* Electronic Credit Ledger */}</th>
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
                      <th>{/* TDS/TCS */}</th>
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
                      <th>{/* TDS/TCS */}</th>
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
                      <th>{/* TDS/TCS */}</th>
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
                      <th>{/* TDS/TCS */}</th>
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
                    {type === "regular" && (
                      <tr>
                        <th>{/* TDS/TCS */}</th>
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
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex p-1rem jc-between">
                <div className="flex g-1rem flex-wrap">
                  <Link
                    to="/gst/gstr1/ledger"
                    className="button is-primary is-small has-icon"
                  >
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
      </div>
      <Modal open={open} setOpen={setOpen} onClose={handleClose}>
        {showhide === "login" && (
          <div className="login-box p-2rem">
            <form className="flex dir-col g-1rem" onSubmit={handleLogin}>
              <h5>GST Login</h5>
              <div className="field">
                <label htmlFor="gstin" className="label">
                  GSTIN
                </label>
                <input
                  type="text"
                  className="input"
                  id="gstin"
                  name="gstin"
                  placeholder="GSTIN"
                  autoComplete="gstin"
                  onChange={(e) => setGstin(e.target.value)}
                  value={gstin}
                />
              </div>
              <div className="field">
                <label htmlFor="username" className="label">
                  GST Portal Username
                </label>
                <input
                  type="text"
                  className="input"
                  id="username"
                  name="username"
                  placeholder="Portal Username"
                  autoComplete="gst-username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </div>
              {error ? <ErrorMessage message={error} /> : null}
              <button className="button is-primary">
                {signinIn ? <span className="spinner small"></span> : "Login"}
              </button>
            </form>
          </div>
        )}
        {showhide === "verify" && (
          <div className="login-box">
            <form className="flex dir-col g-1rem" onSubmit={handleVerify}>
              <p>Enter OTP Sent On Your Mobile</p>
              <div className="field">
                <input
                  type="text"
                  className="input"
                  name="otp"
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                  id="otp"
                  placeholder="Enter OTP"
                  autoComplete="off"
                  required
                />
              </div>
              {error ? (
                <div className="error-message">
                  <CloseCircleIcon />
                  {error}
                </div>
              ) : null}
              <button className="button is-primary">
                {signinIn ? <span className="spinner small"></span> : "Verify"}
              </button>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
}
