import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import ArrowRightIcon from "../../components/icons/ArrowRightIcon";
import "./Gstr.css";
import LoginModal from "./LoginModal";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../constants.js";
import useAuth from "../../hooks/useAuth";
import CloseCircleIcon from "../../components/icons/CloseCircleIcon";
import { GST_LOGIN } from "../../store/actions";
import { Ticks } from "chart.js";

const months = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const tableData = [
  { supplyValue: "", igst: 18, cgst: 9, sgst: 9, cess: 2 },
  { supplyValue: "", igst: 36, cgst: 18, sgst: 18, cess: 4 },
  { supplyValue: "", igst: 54, cgst: 27, sgst: 27, cess: 6 },
  { supplyValue: "", igst: 72, cgst: 36, sgst: 36, cess: 8 },
  { supplyValue: "", igst: 90, cgst: 45, sgst: 45, cess: 10 },
  { supplyValue: "", igst: 108, cgst: 54, sgst: 54, cess: 12 },
  { supplyValue: "", igst: 126, cgst: 63, sgst: 63, cess: 14 },
  { supplyValue: "", igst: 144, cgst: 72, sgst: 72, cess: 16 },
];

const yearRanges = [
  "2020-2021",
  "2021-2022",
  "2022-2023",
  "2023-2024",
  // Add more year ranges as needed
];

const Gstr = () => {
  const { token } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [signinIn, setSigningIn] = useState(false);
  const [error, setError] = useState("");
  const [showhide, setShowHide] = useState("login");
  const [otp, setOtp] = useState("");
  const [gstin, setGstin] = useState("");
  const [username, setUsername] = useState("");
  const [isVerifyModalOpen, setVerifyModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = async () => {
    // Handle login logic here
    let token = JSON.parse(localStorage.getItem("itaxData"));
    console.log(token.token);
    try {
      setSigningIn(true);

      setError("");

      if (!gstin || !username) {
        throw new Error("GSTIN and Username cannot be empty.");
      }

      const response = await fetch(`${BASE_URL}/gst/tax-payer/generate-otp`, {
        method: "POST",
        headers: new Headers({
          Authorization: `Bearer ${token.token}`,
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(
          // gstin: "23BNJPS3408M1ZP",
          // gst_portal_username: "newsethielectri"
          {
            gstin,
            username,
          }
        ),
      });

      const data = await response.json();

      console.log(data);
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setSigningIn(false);
      setShowHide("verify");
      setVerifyModalOpen(true);
    }
    closeModal();
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    console.log(gstin, username);
    try {
      setSigningIn(true);

      setError("");
      let token = JSON.parse(localStorage.getItem("itaxData"));

      if (!otp) {
        throw new Error("OTP cannot be empty.");
      }
      console.log(gstin, username);
      const response = await fetch(`${BASE_URL}/gst/tax-payer/verify-otp`, {
        method: "POST",
        headers: new Headers({
          Authorization: `Bearer ${token.token}`,
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
        `${BASE_URL}/gst/search/gstin?gstin=${gstin}`,
        {
          Authorization: `Bearer ${token.token}`,
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
      setVerifyModalOpen(false);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div className="container">
      <Sidebar open={false} />
      <div className="main">
        <Topbar />
        <div className="inner-container">
          <div className="flex justify-between w-full">
            <div className="flex gap-2 pl-1 ">
              <div className="">
                <div className="border-2 pt-2 pb-2 pl-3 pr-3 bg-blue-500 text-white rounded-md">
                  Regular Return
                </div>
                <div className="border-2 pt-2 pb-2 pl-3 pr-3 bg-blue-500 text-white rounded-md text-center flex justify-center items-center ">
                  Summary GSTR-3B
                </div>
              </div>
              <div className="pt-2 pb-2 pl-3 pr-3">
                Aadhar verification status:- Pending
                <div className="pt-2 pb-2 pl-3 pr-3 text-blue-600 gap-2 text-sm">
                  {">>"}EasyInvoice
                </div>
                <div className="pt-2 pb-2 pl-3 pr-3 text-blue-600 gap-2 text-sm">
                  {">>"}e-way Bill
                </div>
              </div>
            </div>

            <div>
              <div className=" flex flex-col justify-center align-center ">
                <div className="flex justify-center pt-1 ">
                  <label htmlFor="month">Period:</label>
                  <select
                    id="month"
                    name="month"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 "
                  >
                    <option value="">Month</option>
                    {months.map((month) => (
                      <option key={month.value} value={month.value}>
                        {month.label}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="year" className="ml-3">
                    F.Y:
                  </label>
                  <select
                    id="year"
                    name="year"
                    value={selectedYear}
                    onChange={handleYearChange}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 "
                  >
                    <option value="">Year</option>
                    {yearRanges.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                {showhide === "verify" && (
                  <div className="modal">
                    <div className="modal-content">
                      <div className="login-box">
                        <form
                          className="flex dir-col g-1rem"
                          onSubmit={handleVerify}
                        >
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
                            {signinIn ? (
                              <span className="spinner small"></span>
                            ) : (
                              "Verify"
                            )}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-center gap-4 mt-1">
                  <div className="border-2 pt-2 pb-2 pl-3 pr-3 bg-blue-500 text-white rounded-md flex justify-center items-center ">
                    Check Return Status
                  </div>
                  {showhide === "Howdy" ? (
                    <button className="button is-primary is-small">
                      Howdy!
                    </button>
                  ) : (
                    <div
                      className="border-2 pt-2 pb-2 pl-3 pr-3 bg-blue-500 text-white rounded-md flex justify-center items-center "
                      onClick={openModal}
                    >
                      Login Details
                    </div>
                  )}
                  {/* <LoginModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onSubmit={handleSubmit}
                  /> */}

                  {isModalOpen && (
                    <div className="modal">
                      <div className="modal-content">
                        <h2>Login to your GSTIN account</h2>
                        <div className="form-group">
                          <label htmlFor="gstin">GSTIN</label>
                          <input
                            type="text"
                            id="gstin"
                            placeholder="GSTIN"
                            value={gstin}
                            onChange={(e) => setGstin(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="username">Username</label>
                          <input
                            type="text"
                            id="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                        <div className="form-buttons">
                          <button
                            onClick={handleSubmit}
                            className="submit-button"
                          >
                            Submit
                          </button>
                          <button
                            onClick={closeModal}
                            className="close-button ml-2"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="border-2 pt-2 pb-2 pl-3 pr-3 bg-blue-500 text-white text-center rounded-md ">
                Permanent Information
              </div>
              <div className="border-2 pt-2 pb-2 pl-3 pr-3 bg-blue-500 text-white rounded-md ">
                Registration Details
              </div>
            </div>
          </div>

          <hr></hr>

          <div className="flex">
            <div className="w-3/4 pl-1">
              {/* <div className="flex gap-2">
            <div className="border-2 pt-2 pb-2 pl-3 pr-3 bg-blue-500 text-white text-center rounded-md">
              Permanent Information
            </div>
            <div className="border-2 pt-2 pb-2 pl-3 pr-3 bg-blue-500 text-white text-center rounded-md">
              Registration Details
            </div>
            <div className="pt-2 pb-2 pl-1 pr-1 text-center text-blue-600 text-sm">
              Registered GSTIN
            </div>
            <div className="pt-2 pb-2 pl-1 pr-1 text-center text-blue-600 text-sm">
              {">>"}Get GSTN Data
            </div>
            <div className="pt-2 pb-2 pl-1 pr-1 text-center text-blue-600 text-sm">
              {">>"}GSTN Notice/Order
            </div>
          </div> */}

              <div className="flex gap-2 ">
                {/* <div className="border-2 pt-2 pb-2 pl-3 pr-3 bg-blue-500 text-white text-center rounded-md">
              Master tables
            </div> */}
                <div className="border-2 pt-2 pb-2 pl-3 pr-3 bg-blue-500 text-white text-center rounded-md ">
                  Import Excel/Tally Data
                </div>
                <div className="pt-2 pb-2 pl-1 pr-1 text-center text-blue-600 text-sm">
                  GSTR-3B filing is pending
                </div>
                <div className="pt-2 pb-2 pl-1 pr-1 text-center text-blue-600 text-sm">
                  | GSTR-1 filing is pending
                </div>
                <div className="pt-2 pb-2 pl-1 pr-1 text-center text-blue-600 text-sm">
                  | GSTR-9 filing is pending
                </div>
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="border-2 w-1/4 pt-10 ">
              <Link to="/gst/outward-supplies">
                <div className="flex justify-between pr-1 pl-1">
                  <div className="border-2 pt-2 pb-2 pl-2 pr-2 bg-blue-500 text-white text-left text-sm rounded-md w-40">
                    Sales (GSTR-1)
                  </div>
                  <div className="text-sm pt-2">A</div>
                </div>
              </Link>

              <Link to="/gst/inward-supplies">
                <div className="flex justify-between pr-1 pl-1">
                  <div className="border-2 pt-2 pb-2 pl-2 pr-2 bg-blue-500 text-white text-left text-sm rounded-md w-40">
                    Purchase (GSTR-2)
                  </div>
                  <div className="text-sm pt-2">B</div>
                </div>
              </Link>

              <div className="flex justify-between align-center pt-3 pb-2 pl-1 pr-1">
                <div className="text-sm">Utilized ITC Balance</div>
                <div className="text-sm">C</div>
              </div>

              <div className="flex justify-between pt-3 pb-2 pl-1 pr-1">
                <div className="text-sm">
                  Net Tax Liability on Outward Supply:(A-C)
                </div>
                <div className="text-sm">D</div>
              </div>

              <div className="flex justify-between pt-3 pb-2 pl-1 pr-1">
                <div className="text-sm">
                  Add: Tax Liability on Inward Supply
                </div>
                <div className="text-sm">E</div>
              </div>

              <div className="flex justify-between pt-3 pb-2 pl-1 pr-1">
                <div className="text-sm">Total Tax Payyable in Csah: (D+E)</div>
                <div className="text-sm">F</div>
              </div>

              <div className="flex justify-between pt-3 pb-2 pl-1 pr-1">
                <div className="text-sm">Less: Utilized Cash Balance</div>
                <div className="text-sm">G</div>
              </div>

              <div className="flex justify-between pt-3 pb-2 pl-1 pr-1">
                <div className="text-sm">Balance GST Due: (F-G)</div>
                <div className="text-sm">H</div>
              </div>
            </div>
            <div className="border-2 w-2/4 pt-0">
              <table className="border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 bg-gray-300 p-2 ">
                      Supply Value
                    </th>
                    <th className="border border-gray-300 bg-gray-300 p-2">
                      IGST
                    </th>
                    <th className="border border-gray-300 bg-gray-300 p-2">
                      CGST
                    </th>
                    <th className="border border-gray-300 bg-gray-300 p-2">
                      SGST
                    </th>
                    <th className="border border-gray-300 bg-gray-300 p-2">
                      CESS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">
                        {row.supplyValue}
                      </td>
                      <td className="border border-gray-300 p-2">{row.igst}</td>
                      <td className="border border-gray-300 p-2">{row.cgst}</td>
                      <td className="border border-gray-300 p-2">{row.sgst}</td>
                      <td className="border border-gray-300 p-2">{row.cess}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-2 w-1/4 pt-0">
              <h1 className="flex justify-between pt-2 pb-2 pl-1 pr-1 font-semibold">
                Ledger Balances
              </h1>
              <div className="flex justify-between pt-2 pb-2 pl-1 pr-1 mr-1 text-sm">
                <h1 className="flex justify-between pt-2 pb-2 pl-3 pr-3 border-2 bg-blue-500 text-white rounded-md ">
                  Ledger details
                </h1>
                <h1>Balance</h1>
              </div>
              <div className="flex justify-between pt-2 pb-2 pl-1 pr-1 mr-1 text-sm">
                <h1>Credit Ledger</h1>
                <h1>0</h1>
              </div>
              <div className="flex justify-between pt-2 pb-2 pl-1 pr-1 mr-1 text-sm">
                <h1>Liability Ledger</h1>
                <h1>0</h1>
              </div>
              <div className="flex justify-between pt-2 pb-2 pl-1 pr-1 mr-1 text-sm">
                <h1>Cash Ledger</h1>
                <h1>0</h1>
              </div>
              <div className="flex justify-between pt-2 pb-2 pl-1 pr-1 mr-1 text-sm">
                <h1 className="flex justify-between pt-2 pb-2 pl-3 pr-3 border-2 bg-blue-500 text-white rounded-md">
                  PMT09
                </h1>
                <h1>0</h1>
              </div>
              <div className="flex justify-between pt-2 pb-2 pl-1 pr-1 mr-1 text-sm">
                <h1 className="flex justify-between pt-2 pb-2 pl-3 pr-3 border-2 bg-blue-500 text-white rounded-md ">
                  Late Fees +
                </h1>
                <h1>0</h1>
              </div>
              <hr></hr>
              <hr></hr>
              <div className="flex gap-10 text-sm justify-start items-center mt-2">
                <div className="flex justify-between pt-2 pb-2 pl-3 pr-3 border-2 bg-blue-500 text-white rounded-md">
                  Annual Return GSTR-9
                </div>
                <div className="flex justify-between pt-2 pb-2 pl-3 pr-3 border-2 bg-blue-500 text-white rounded-md ">
                  GSTR-9C
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gstr;
