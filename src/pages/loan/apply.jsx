import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import LoanDocumentsForm from "../../components/LoanDocumentsForm.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";
import { LOAN_TYPES } from "./data.js";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import business_loan_icon from "../../components/images/business_loan_icon.png";
import car_loan_icon from "../../components/images/car_loan_icon.png";
import Home_loan_icon from "../../components/images/Home_loan_icon.png";
import personal_loan_icon from "../../components/images/personal_loan_icon.jpg";
import property_loan_icon from "../../components/images/property_loan_icon.jpg";
import ApplyLoan from "./ApplyLoan.jsx";
import { BASE_URL } from "../../constants.js";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);



export default function ApplyForLoan() {
  const [search, setSearch] = useSearchParams();
  const loanType = search.get("loanType");
  const [salaried, setSalaried] = useState("true");
  const [showDocuments, setShowDocuments] = useState(true);
  const [showApplyLoan, setShowApplyLoan] = useState(false);
  const [loans, setLoans] = useState([]);
  
  const [formData, setFormData] = useState({
    id: "",
  });
  
const storedData = JSON.parse(localStorage.getItem('itaxData'));
 
  // const [fetchedData, setFetchedData] = useState([]);
 
 
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   const storedData = JSON.parse(localStorage.getItem('itaxData'));
  //   try {
  //     const response = await axios.get(`${BASE_URL}/loan/loans/getAll`, {
  //       headers: {
  //         Authorization: `Bearer ${storedData.token}`,
  //       },
  //     });

  //     if (response.status === 200) {
       
  //       console.log(response.data.data.applications)
  //       setFetchedData(response.data.data.applications); // Set fetched data in the state
       
  //     } else {
  //       console.error('Failed to fetch data');
  //     }
  //   } catch (error) {
  //     console.error('Failed to fetch API', error);
  //   }
  // }
 
  // const countPendingDocuments = () => {
  //   return fetchedData.filter(item => item.type === "pending").length;
  // };

  useEffect(() => {
    // Use the formData state in any way you need
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.itaxeasy.com/loan/loans",{
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedData.token}`,
          },
        });
        const data = await response.json();
        setLoans(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const toggleDocuments = () => {
    setShowDocuments(true);
    setShowApplyLoan(false);
  };

  const toggleApplyLoan = () => {
    setShowDocuments(false);
    setShowApplyLoan(true);
  };

  const data = {
    labels: [
      "Business Loan",
      "Car Loan",
      "Personal Loan",
      "Home Loan",
      "Loan Against Property",
    ],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100, 20, 10],
        backgroundColor: [
          "rgb(128, 211, 204)", // Lighter Teal
          "rgb(255, 173, 102)", // Lighter Orange
          "rgb(88, 199, 198)", // Lighter Greenish-Teal
          "rgb(255, 136, 136)", // Lighter Salmon
          "rgb(170, 153, 225)", // Lighter Purple
        ],
        hoverOffset: 4,
      },
    ],
  };

  const loanTypeIcons = {
    business: business_loan_icon,
    personal: personal_loan_icon,
    home: Home_loan_icon,
    property: property_loan_icon,
    car: car_loan_icon,
    // Add other loan types and their corresponding icons
  };

  // USER Dashboard data

  const loanId =  JSON.parse(localStorage.getItem('loanId'));
  console.log(loanId)

  const loanOptions = [
    {
      name: "Loan Option 1",
      amount: 10000,
      interestRate: 5,
      loanTerm: 24,
      fees: 100,
    },
    {
      name: "Loan Option 2",
      amount: 15000,
      interestRate: 4.5,
      loanTerm: 36,
      fees: 150,
    },
    {
      name: "Loan Option 3",
      amount: 12000,
      interestRate: 6,
      loanTerm: 48,
      fees: 200,
    },
  ];

 
  


  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="inner-container">
          <h6 className="text-secondary">Apply For Loan</h6>
          {loanType ? (
            <div className="">
              <div className="section">
                <div className="mt-4">
                  <button
                    className={`button ${
                      showDocuments ? "is-primary" : "bg-gray-200"
                    } pl-5 pr-5`}
                    onClick={toggleDocuments}
                  >
                    Required Documents
                  </button>
                  <button
                    className={`button ${
                      showApplyLoan ? "is-primary" : "bg-gray-200"
                    } pl-5 pr-5`}
                    onClick={toggleApplyLoan}
                  >
                    Loan Application
                  </button>
                </div>
                {showApplyLoan && (
                  <>
                    {/* <ApplyLoan /> */}
                   <ApplyLoan formData={loanId} />
                  </>
                )}
                {showDocuments && salaried !== "" && (
                  <>
                    <div className="flex dir-col g-1rem">
                      <strong>Are you salaried?</strong>
                      <select
                        className="select is-small"
                        onChange={(e) => setSalaried(e.target.value)}
                        value={salaried}
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                    <LoanDocumentsForm type={loanType} salaried={salaried} />
                  </>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex gap-5">
                {["business", "home", "property", "car", "personal"].map(
                  (type) => (
                    <Link
                      key={type}
                      to={`/loan/${type}`} // Assuming you have a route like "/loans/:loanType"
                      className={`card hoverable jc-center ai-center gap-2 bg-white border border-gray-300 rounded-lg shadow-md transform transition duration-500 hover:scale-105 hover:bg-amber-100`}
                    >
                      <img
                        src={loanTypeIcons[type]}
                        alt={`${type} Icon`}
                        className="icon w-10"
                      />
                      <h6 className="text-center text-sm font-medium capitalize">
                        {type}
                      </h6>
                    </Link>
                  )
                )}
              </div>
              {/* <div className="mt-10">
                <h1 className="text-2xl font-bold mb-4">Loan List</h1>
                {data1.loan1.length === 0 ? (
                  <p>No loans available</p>
                ) : (
                  <table className="w-full border-collapse ">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 bg-blue-300 text-gray-700 font-semibold text-left">
                          Loan Id
                        </th>
                        <th className="py-2 px-4 bg-blue-300 text-gray-700 font-semibold text-left">
                          Applicant Name
                        </th>
                        <th className="py-2 px-4 bg-blue-300 text-gray-700 font-semibold text-left">
                          Loan type
                        </th>

                        <th className="py-2 px-4 bg-blue-300 text-gray-700 font-semibold text-left">
                          Min Amount
                        </th>

                        <th className="py-2 px-4 bg-blue-300 text-gray-700 font-semibold text-left">
                          Max Amount
                        </th>

                        <th className="py-2 px-4 bg-blue-300 text-gray-700 font-semibold text-left">
                          Apply Loan
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data1.loan1.map((loan) => (
                        <tr key={loan.id} className="border-b">
                          <td className="py-2 px-4 ">{loan.id}</td>
                          <td className="py-2 px-4 ">{loan.name}</td>
                          <td className="py-2 px-4">{loan.type}</td>
                          <td className="py-2 px-4">{loan.minAmount}</td>
                          <td className="py-2 px-4">{loan.maxAmount}</td>
                          <Link to="/loan/apply?loanType=Business+Loan">
                            <button
                              className="py-2 px-4 bg-blue-600 hover:bg-blue-600 text-white py-2 px-4 rounded-md mt-1 mb-1"
                              onClick={() => handleClick(loan.id)}
                            >
                              Apply Loan
                            </button>
                          </Link>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div> */}

              <div className="flex justify-around align-center">
                <div className="flex flex-col pt-20 w-80 text-center">
                  <h1 className="text-lg pt-15 text-primary">
                    Relational proportions between loans
                  </h1>
                  <Pie data={data} />
                </div>
                <div className="flex flex-col pt-20 w-60 text-center rounded-md">
                  <h1 className="text-lg text-primary mb-3">Calculate EMI</h1>

                  <div className="h-10 border-2 bg-blue-500 text-white rounded-xl p-2 mb-2 hover:bg-blue-600 cursor-pointer transition-colors">
                    <a
                      href="https://itaxeasy.com/financialcal/businesscal"
                      target="_blank"
                    >
                      Calculate Business Loan EMI
                    </a>
                  </div>
                  <div className="h-10 border-2 bg-blue-300 text-white rounded-xl p-2 mb-2 hover:bg-blue-400 cursor-pointer transition-colors">
                    <a
                      href="https://itaxeasy.com/financialcal/carloancal"
                      target="_blank"
                    >
                      Calculate Car Loan EMI
                    </a>
                  </div>
                  <div className="h-10 border-2 bg-blue-500 text-white rounded-xl p-2 mb-2 hover:bg-blue-600 cursor-pointer transition-colors">
                    <a
                      href="https://itaxeasy.com/financialcal/personalloancal"
                      target="_blank"
                    >
                      Calculate Personal Loan EMI
                    </a>
                  </div>
                  <div className="h-10 border-2 bg-blue-300 text-white rounded-xl p-2 mb-2 hover:bg-blue-400 cursor-pointer transition-colors">
                    <a
                      href="https://itaxeasy.com/financialcal/homeloancal"
                      target="_blank"
                    >
                      Calculate Home Loan EMI
                    </a>
                  </div>
                  <div className="h-10 border-2 bg-blue-500 text-white rounded-xl p-2 mb-2 hover:bg-blue-600 cursor-pointer transition-colors">
                    <a
                      href="https://itaxeasy.com/financialcal/loanagainstcal"
                      target="_blank"
                    >
                      Calculate Property Loan EMI
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex border rounded-md w-full ">
                <div className="w-2/4  ">
                  {/* Add your additional component or content here */}
                  <div className="p-0 ">
                    <h2 className="text-blue-900 text-lg ">Loan Comparison</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
                      {loanOptions.map((loan, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-md shadow p-4"
                        >
                          <h3 className="mb-2 text-lg">{loan.name}</h3>
                          <p className="text-gray-600 mb-4">
                            Loan Amount: ₹{loan.amount}
                          </p>
                          <p className="text-gray-600 mb-4">
                            Interest Rate: {loan.interestRate}%
                          </p>
                          <p className="text-gray-600 mb-4">
                            Loan Term: {loan.loanTerm} months
                          </p>
                          <p className="text-gray-600 mb-4">
                            Fees: ₹{loan.fees}
                          </p>
                          <button className="bg-blue-600 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
                            Apply Now
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
