import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import Topbar from '../../../components/Topbar'
import axios from 'axios';
import {BASE_URL} from "../../../constants.js"
import { Link } from 'react-router-dom';


const PropertyLoan = () => {
  const [applications, setApplications] = useState([]);

  const handleClick = (loanId) => {
   
   
    localStorage.setItem("loanId",JSON.stringify(loanId))
  };

const storedData = JSON.parse(localStorage.getItem('itaxData'));

  
  useEffect(() => {
    fetchLoanApplications();
  }, []);

  const fetchLoanApplications = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/loan/loans/getAll`, {
        headers: {
          Authorization: `Bearer ${storedData.token}`,
        },
      });

      if (response.status === 200) {
          const busApplications = response.data.loans.filter(application => application.type === 'home');
          setApplications(busApplications);  // Set fetched applications in the state
      } else {
        console.error('Failed to fetch loan applications');
      }
    } catch (error) {
      console.error('Failed to fetch loan applications', error);
    }
  };
  return (
    <div className="container">
    <Sidebar />
    <div className="main">
      <Topbar />
      <div className="inner-container">
      <div className="mt-10">
              <h1 className="text-2xl font-bold mb-4">Personal Loan List</h1>
              {applications.length === 0 ? (
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
                    {applications && applications.map((loan) => (
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
            </div>
  </div>
  </div>
  </div>
)
}

export default PropertyLoan