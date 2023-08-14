import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import ArrowRightIcon from "../../components/icons/ArrowRightIcon";
import "./Gstr.css";
import LoginModal from "./LoginModal";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants.js";
import useAuth from "../../hooks/useAuth";
import CloseCircleIcon from "../../components/icons/CloseCircleIcon";
import { GST_LOGIN } from "../../store/actions";
import { Ticks } from "chart.js";
import Gstr1 from "../gst/gstr1/gstr1";



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

const monthRanges = [
  { value: "Apr-Jun", months: [4, 5, 6] },
  { value: "Jul-Sep", months: [7, 8, 9] },
  { value: "Oct-Dec", months: [10, 11, 12] },
  { value: "Jan-Mar", months: [1, 2, 3] }
];

const months = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' }
];
const getMonthRange = (month) => {
  if (month >= 4 && month <= 6) {
    return 'APR-June';
  } else if (month >= 7 && month <= 9) {
    return 'July-Sep';
  } else if (month >= 10 && month <= 12) {
    return 'Oct-Dec';
  } else {
    return 'Jan-Mar';
  }
};




const Gstr = () => {
  const { token } = useAuth();
  
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonthRange, setSelectedMonthRange] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [signinIn, setSigningIn] = useState(false);
  const [error, setError] = useState("");
  const [showhide, setShowHide] = useState("login");
  const [otp, setOtp] = useState("");
  const [gstin, setGstin] = useState("");
  const [username, setUsername] = useState("");
  const [isVerifyModalOpen, setVerifyModalOpen] = useState(false);
  const SelectOptions = [
    'GSTR-1',
    'GSTR-2A',
    'GSTR-2B',
    'GSTR-3B',
    'GSTR-4',
    'GSTR-7',
    'GSTR-9',
    'GSTR-9B'
  ];
  const [detail, setDetail] = useState(false)
  const [selectedRegistrationType, setSelectedRegistrationType] = useState('');
  const [selectedReturnType, setSelectedReturnType] = useState('');
   // Get the history object

 

  const navigate=useNavigate()
      
  console.log(selectedYear,selectedMonthRange,selectedMonth)
  const handleRegistrationTypeChange = (e) => {
    setSelectedRegistrationType(e.target.value);
    setSelectedReturnType('');
  };

  const handleReturnTypeChange = (e) => {
    setSelectedReturnType(e.target.value);
    const selectedValue = e.target.value;
    console.log(e.target.value)


  if (selectedValue === 'GSTR-1') {
    navigate('/gst/gstr1')
  } else if (selectedValue === 'GSTR-2a') {
    navigate('/gst/gstr2a')
  } else if (selectedValue === 'GSTR-2B') {
    navigate('/gst/gstr2b')
  } else if (selectedValue === 'GSTR-3B') {
    navigate('/gst/gstr3b')
  }
   
  };

  const isValidGstin = (input) => {
    // Example regular expression for GSTIN validation
    const gstinPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Za-z]{1}[Z]{1}[0-9A-Z]{1}$/;
    return gstinPattern.test(input);
  };

 



  const regularReturnOptions = [
    { value: 'GSTR-1', label: 'GSTR-1' , link:'/gst/gstr1'},
    { value: 'GSTR-2a', label: 'GSTR-2A',link:'/gst/gstr2a' },
    { value: 'GSTR-2B', label: 'GSTR-2B',link:'' },
    { value: 'GSTR-3B', label: 'GSTR-3B',link:'/gst/gstr3b' },  
  ];

  const compositionReturnOptions = [
    { value: 'GSTR-4', label: 'GSTR-4' },
    { value: 'CMP-08', label: 'CMP-08' },
  ];

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };


  const habdleDetail = () => {
    setDetail(true)
  }



  const handleSubmit = async () => {
    // Handle login logic here

    if (!gstin) {
      setError('Please enter a GSTIN.');
      return;
    }
    if (gstin.length !== 15) {
      setError('GSTIN must be 15 characters long.');
      return;
    }
    if (!isValidGstin(gstin)) {
      setError('Invalid GSTIN format.');
      return;
    }
   

    let token = JSON.parse(localStorage.getItem("itaxData"));
    console.log(token.token);
    console.log(gstin,username)
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
      localStorage.setItem("gstnData",JSON.stringify({gstin,username}))
      setVerifyModalOpen(true);
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
    try {
      setSigningIn(true);

      setError("");
      let token = JSON.parse(localStorage.getItem("itaxData"));
      let gstnData=JSON.parse(localStorage.getItem("gstnData"))
      console.log(gstnData.gstin,gstnData.username)
      if (!otp) {
        throw new Error("OTP cannot be empty.");
      }
      
      const response = await fetch(`${BASE_URL}/gst/tax-payer/verify-otp`, {
        method: "POST",
        headers: new Headers({
          Authorization: `Bearer ${token.token}`,
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          gstin:gstnData.gstin,
          gst_portal_username: username,
          otp,
        }),
      });

      if (!response.ok) {
        throw new Error(`Couldn't Verify.`);
      }


      const gstRequest = await fetch(
        `${BASE_URL}/gst/search/gstin?gstin=${gstin}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
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

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setSelectedMonthRange('');
    setSelectedMonth('');
  };

  const handleMonthRangeChange = (e) => {
    setSelectedMonthRange(e.target.value);
    setSelectedMonth('');
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const getValidMonths = () => {
    if (!selectedMonthRange || !selectedYear) return [];
  
    const selectedMonthRangeInfo = monthRanges.find(
      (range) => range.value === selectedMonthRange
    );
  
    if (!selectedMonthRangeInfo) return [];
  
    const validMonths = selectedMonthRangeInfo.months;
  
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
  
    // Check if the selected year and month range match the current year and current quarter
    if (
      selectedYear === currentYear &&
      selectedMonthRangeInfo.months.includes(currentMonth)
    ) {
      // If current month is within the selected month range
      // and is part of the ongoing quarter, remove it from valid months
      validMonths.splice(
        validMonths.findIndex((month) => month === currentMonth),
        1
      );
    }
  
    return months.filter((month) => validMonths.includes(month.value));
  };
  
  

  return (
    <div className="container">
      <Sidebar open={false} />
      <div className="main">
        <Topbar />
        <div className="inner-container">
          <h6 className="text-secondary ml-1 mb-2">GSTR Page</h6>

          
          <div className="flex justify-between w-full">
            <div className="flex gap-2 pl-1 ">

              
              <div className=" flex flex-col space-y-2">
                <div className=" p-8 bg-blue-300 rounded shadow-md">
                  <div className=" flex space-x-2">
                    <div className="flex space-x-2">
                      <label htmlFor="year" className="text-white">
                        F.Y:
                      </label>
                      <select
                        id="year"
                        name="year"
                        value={selectedYear}
                        onChange={handleYearChange}
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Year</option>
                        {yearRanges.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                      <div className="flex space-x-2">
                        <label htmlFor="monthRange" className="text-white">
                          Period Range:
                        </label>
                        <select
                          id="monthRange"
                          name="monthRange"
                          value={selectedMonthRange}
                          onChange={handleMonthRangeChange}
                          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Period Range</option>
                          {monthRanges.map((range) => (
                            <option key={range.value} value={range.value}>
                              {range.value}
                            </option>
                          ))}
                        </select>
                      </div>
                    
                    
                      <div className="flex space-x-2">
                        <label htmlFor="month" className="text-white">
                          Month:
                        </label>
                        <select
                          id="month"
                          name="month"
                          value={selectedMonth}
                          onChange={handleMonthChange}
                          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Month</option>
                          {getValidMonths().map((month) => (
                            <option key={month.value} value={month.value}>
                              {month.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    
                  </div>
                </div>
              </div>




            </div>
               
               {/* <div>
            <div className="flex flex-col justify-center align-center ">
              <div className="bg-blue-300 pl-10 pr-10 pt-5 pb-5 rounded-md shadow-md">
                <label htmlFor="reportType" className="block font-medium mb-1">
                  Select Report Type:
                </label>
                <select
                  id="reportType"
                  name="reportType"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select an option</option>
                  {SelectOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            </div> */}

            <div className="flex ">
            <div className="inline-block">
              <span className=" p-8 bg-blue-300 rounded shadow-md inline-block ">
                <span className="flex space-x-2">
                  <label htmlFor="registrationType" className="text-white">
                    Registration Type:
                  </label>
                  <select
                    id="registrationType"
                    name="registrationType"
                    value={selectedRegistrationType}
                    onChange={handleRegistrationTypeChange}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Registration Type</option>
                    <option value="composition">Composition</option>
                    <option value="regular">Regular</option>
                  </select>
                  {selectedRegistrationType === 'regular' && (
                    <select
                      id="returnType"
                      name="returnType"
                      value={selectedReturnType}
                      onChange={handleReturnTypeChange}
                      className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Return Type</option>
                      {regularReturnOptions.map((option) => (
                         
                         <option key={option.value} value={option.value}  >
                       {option.label}       
                         </option>
                        
                       ))}
                      
                    </select>
                  )}


                  {selectedRegistrationType === 'composition' && (
                    <select
                      id="returnType"
                      name="returnType"
                      value={selectedReturnType}
                      onChange={handleReturnTypeChange}
                      className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Return Type</option>
                      {compositionReturnOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                </span>
              </span>


            </div>

            
          </div>

          </div>

          <div className="flex justify-center align-center">
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

                </div>

          {isModalOpen && <div>
              <div className=" flex flex-col justify-center align-center ">
                



                {/* <LoginModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onSubmit={handleSubmit}
                  /> */}
              </div>
              <div>
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
                          onChange={(e) => setGstin(e.target.value.toUpperCase())}
                        />
                        {error && <p className="error-message">{error}</p>}
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
              <button onClick={handleSubmit} className="submit-button">
                Submit
              </button>
              <button onClick={closeModal} className="close-button ml-2">
                Close
              </button>
            </div>
                    </div>
                  </div>
                )}
              </div>
            </div>}

          <hr></hr>
          <div className="flex border-2 gap-2"> 
              <div className="custom-button">
                Check Return Status
              </div>
              <div className="custom-button" onClick={habdleDetail}>
                Permanent Information
              </div>

             
               <div className="custom-button" >
                 Registration Details
                </div>
                <div className="">
                  {showhide === "Howdy" ? (
                    <button className="button is-primary is-small">
                      Howdy!
                    </button>
                  ) : (
                    <div>
                <div
                      className="custom-button"
                      onClick={openModal}
                    >
                      Login
                    </div>
                    </div>
                  )}
                </div>
             
            </div>

          <hr></hr>

          <div className="flex justify-center text-center bg-blue-300  pl-4 pr-4 rounded-md">
              <div className="pl-1 flex justify-center text-center">
                <div className="flex gap-2 mb-2 mt-2 items-center"> {/* Added items-center */}
                  <div className="pt-2 pb-2 pl-1 pr-1 text-center text-blue-600 text-sm">
                    GSTR-3B filing is pending
                  </div>
                  <div className="pt-2 pb-2 pl-1 pr-1 text-center text-blue-600 text-sm">
                    | GSTR-1 filing is pending
                  </div>
                  <div className="pt-2 pb-2 pl-1 pr-1 text-center text-blue-600 text-sm">
                    | GSTR-9 filing is pending
                  </div>
                  <div className="pt-2 pb-2 pl-1 pr-1 text-center text-blue-600 text-sm">
                    | {">>"}EasyInvoice
                  </div>
                </div>
              </div>
            </div>
          <hr></hr>



          <div className="flex">
            <div className="border-2 w-1/4 pt-10 ">
              <Link to="/gst/outward-supplies">
                <div className="flex justify-between pr-1 pl-1 mt-2">
                  <div className="custom-button2">
                    Outward Supplies
                  </div>
                  <div className="text-sm text-gray-900">A</div>
                </div>
              </Link>

              <Link to="/gst/inward-supplies">
                <div className="flex justify-between pr-1 pl-1 mt-1">
                  <div className="custom-button2">
                  Inward Supplies
                  </div>
                  <div className="text-sm text-gray-900">B</div>
                </div>
              </Link>

              <div className="flex justify-between align-center pt-2 pb-2 pl-1 pr-1">
                <div className="text-sm text-gray-900">Utilized ITC Balance</div>
                <div className="text-sm text-gray-900">C</div>
              </div>

              <div className="flex justify-between align-center pt-2 pb-2 pl-1 pr-1">
                <div className="text-sm text-gray-900">
                  Net Tax Liability on Outward Supply:(A-C)
                </div>
                <div className="text-sm text-gray-900">D</div>
              </div>

              <div className="flex justify-between align-center pt-2 pb-2 pl-1 pr-1 mt-1">
                <div className="text-sm text-gray-900">
                  Add: Tax Liability on Inward Supply
                </div>
                <div className="text-sm text-gray-900">E</div>
              </div>

              <div className="flex justify-between align-center pt-2 pb-2 pl-1 pr-1 mt-1">
                <div className="text-sm text-gray-900">Total Tax Payyable in Csah: (D+E)</div>
                <div className="text-sm text-gray-900">F</div>
              </div>

              <div className="flex justify-between align-center pt-1 pb-2 pl-1 pr-1 mt-1">
                <div className="text-sm text-gray-900">Less: Utilized Cash Balance</div>
                <div className="text-sm text-gray-900">G</div>
              </div>

              <div className="flex justify-between align-center pt-2 pb-2 pl-1 pr-1 mt-1">
                <div className="text-sm text-gray-900">Balance GST Due: (F-G)</div>
                <div className="text-sm text-gray-900">H</div>
              </div>
            </div>
            <div className="border-2 w-2/4 pt-0">
              <table className="border-collapse border border-gray-300">
                <thead >
                  <tr className="bg-blue-300">
                    <th className="border border-gray-300 p-2 font-semibold">
                      Supply Value
                    </th>
                    <th className="border border-gray-300 p-2 font-semibold">
                      IGST
                    </th>
                    <th className="border border-gray-300 p-2 font-semibold">
                      CGST
                    </th>
                    <th className="border border-gray-300 p-2 font-semibold">
                      SGST
                    </th>
                    <th className="border border-gray-300 p-2 font-semibold">
                      CESS
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index} className="h-10">
                      <td className="border border-gray-300 p-2">
                        {row.supplyValue}
                      </td>
                      <td className="border  p-2 text-sm text-gray-900">{row.igst}</td>
                      <td className="border  p-2 text-sm text-gray-900">{row.cgst}</td>
                      <td className="border  p-2 text-sm text-gray-900">{row.sgst}</td>
                      <td className="border  p-2 text-sm text-gray-900">{row.cess}</td>
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
                <h1 className="custom-button1">
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
                <h1 className="custom-button1">
                  PMT09
                </h1>
                <h1>0</h1>
              </div>
              <div className="flex justify-between pt-2 pb-2 pl-1 pr-1 mr-1 text-sm">
                <h1 className="custom-button1">
                  Late Fees +
                </h1>
                <h1>0</h1>
              </div>
              <hr></hr>
              <hr></hr>
              <div className="flex text-sm justify-between items-center mt-2 pr-1 pl-1">
                <div className="custom-button1">
                  Annual Return GSTR-9
                </div>
                <div className="custom-button1">
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
