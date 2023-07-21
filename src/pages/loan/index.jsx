import { Link, Navigate, useSearchParams } from "react-router-dom";
import AddCircleIcon from "../../components/icons/AddCircleIcon.jsx";
import ViewIcon from "../../components/icons/ViewIcon.jsx";
import Pagination from "../../components/Pagination.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Pie } from "react-chartjs-2";

import { postDateFormatter } from "../../lib/formatter.js";
import { useEffect, useState } from "react";
import accepted from "../../components/images/accepted.png";
import pending from "../../components/images/pending.png";
import rejected from "../../components/images/rejected.png";
import total from "../../components/images/total.png";
// ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  loans: [
    {
      id: 1,
      type: "Business Loan",
      amount: 10_000,
      date_applied: new Date(),
      last_update: new Date(),
      status: "pending",
    },
    {
      id: 2,
      type: "Business Loan",
      amount: 10_000,
      date_applied: new Date(),
      last_update: new Date(),
      status: "pending",
    },
    {
      id: 3,
      type: "Car Loan",
      amount: 10_000,
      date_applied: new Date(),
      last_update: new Date(),
      status: "rejected",
    },
    {
      id: 4,
      type: "Business Loan",
      amount: 10_000,
      date_applied: new Date(),
      last_update: new Date(),
      status: "approved",
    },
  ],
};

const badgeColors = {
  pending: "secondary",
  rejected: "danger",
  approved: "success",
};

const handleClick = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const storedData = JSON.parse(localStorage.getItem("itaxData"));
// console.log(storedData.user.userType)
//   let user=storedData.user.userType
//  console.log(token.data.token)
//  console.log(token.data.user.userType)
// console.log(token.user)

export default function LoanIndex() {
  const [search, setSearch] = useSearchParams();

  // if(user==="normal"){
  //  return <Navigate to="/loan/apply" />
  //  }
  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="inner-container">
          <div className="flex jc-between ai-center">
            <h6 className="text-secondary">Loan</h6>
            <Link
              to="/loan/apply"
              className="button bg-blue-600 text-white is-small has-icon"
            >
              <AddCircleIcon />
              Apply For Loan
            </Link>
            <Link
              to="/loan/create"
              className="button bg-blue-600 text-white is-small has-icon"
            >
              <AddCircleIcon />
              Create Loan
            </Link>

            {/* <Link 
            to="/loan/all"
            className="button bg-blue-600 text-white is-small has-icon"
            >
            All applicant
            </Link> */}
          </div>
          <div className="">
            <h6 className="text-blue-900  text-lg">Statistics</h6>
            <div className="pr-4 pt-5 flex justify-evenly">
              <div className="flex flex-col items-center h-35 border-2 px-4 py-2 rounded-lg bg-blue-300 pb-5 pt-5 w-1/5">
                <img src={`${accepted}`} alt="approved" className="w-10" />
                <div className="flex">
                  <h2 className="text-lg font-medium">Approved Loans</h2>
                </div>
                <div className="flex items-center justify-center w-20 h-10 bg-blue-200 rounded-3xl mt-2 ">
                  <span className="text-primary text-2xl font-bold animate-counting">
                    0
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center h-35 border-2 px-4 py-2 rounded-lg bg-blue-300 pb-5 pt-5 w-1/5">
                <img src={`${pending}`} alt="pending" className="w-10" />
                <div>
                  <h2 className="text-lg font-medium">Pending Loans</h2>
                </div>
                <div className="flex items-center justify-center w-20 h-10 bg-blue-200 rounded-3xl mt-2">
                  <span className="text-primary text-2xl font-bold animate-counting">
                    0
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center h-35 border-2 px-4 py-2 rounded-lg bg-blue-300 pb-5 pt-5 w-1/5">
                <img src={`${rejected}`} alt="pending" className="w-10" />

                <div>
                  <h2 className="text-lg font-medium">Rejected Loans</h2>
                </div>
                <div className="flex items-center justify-center w-20 h-10 bg-blue-200 rounded-3xl mt-2">
                  <span className="text-primary text-2xl font-bold animate-counting">
                    0
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center h-35 border-2 px-4 py-2 rounded-lg bg-blue-300 pb-5 pt-5 w-1/5">
                <img src={`${total}`} alt="total" className="w-10" />

                <div>
                  <h2 className="text-lg font-medium">Total Loans</h2>
                </div>
                <div className="flex items-center justify-center w-20 h-10 bg-blue-200 rounded-3xl mt-2">
                  <span className="text-primary text-2xl font-bold animate-counting">
                    0
                  </span>
                </div>
              </div>
            </div>

            <h6 className="text-blue-900  text-lg mt-10">Statistics For Loan Categories</h6>
          <div className="grid grid-cols-2 gap-4 mt-4">
      <div className="p-4 rounded-lg shadow-md bg-blue-300">
        <h2 className="text-lg  mb-4">Business Loan</h2>
        <div className="grid grid-cols-3 gap-4">
          {/* Approve Loan */}
          <div className="border p-4 rounded-lg flex flex-col items-center">
            <h3 className="text-lg ">Approve Loan</h3>
            <span className="text-xl  mt-2">10</span>
          </div>

          {/* Pending Loan */}
          <div className="border p-4 rounded-lg flex flex-col items-center">
            <h3 className="text-lg ">Pending Loan</h3>
            <span className="text-xl mt-2">5</span>
          </div>

          {/* Rejected Loans */}
          <div className="border p-4 rounded-lg flex flex-col items-center">
            <h3 className="text-lg ">Rejected Loans</h3>
            <span className="text-xl  mt-2">3</span>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-lg shadow-md bg-blue-300">
        <h2 className="text-lg  mb-4">Home Loan</h2>
        <div className="grid grid-cols-3 gap-4">
          {/* Approve Loan */}
          <div className="border p-4 rounded-lg flex flex-col items-center">
            <h3 className="text-lg ">Approve Loan</h3>
            <span className="text-xl  mt-2">10</span>
          </div>

          {/* Pending Loan */}
          <div className="border p-4 rounded-lg flex flex-col items-center">
            <h3 className="text-lg ">Pending Loan</h3>
            <span className="text-xl mt-2">5</span>
          </div>

          {/* Rejected Loans */}
          <div className="border p-4 rounded-lg flex flex-col items-center">
            <h3 className="text-lg ">Rejected Loans</h3>
            <span className="text-xl  mt-2">3</span>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-lg shadow-md bg-blue-300">
        <h2 className="text-lg  mb-4">Car Loan</h2>
        <div className="grid grid-cols-3 gap-4">
          {/* Approve Loan */}
          <div className="border p-4 rounded-lg flex flex-col items-center">
            <h3 className="text-lg ">Approve Loan</h3>
            <span className="text-xl  mt-2">10</span>
          </div>

          {/* Pending Loan */}
          <div className="border p-4 rounded-lg flex flex-col items-center">
            <h3 className="text-lg ">Pending Loan</h3>
            <span className="text-xl mt-2">5</span>
          </div>

          {/* Rejected Loans */}
          <div className="border p-4 rounded-lg flex flex-col items-center">
            <h3 className="text-lg ">Rejected Loans</h3>
            <span className="text-xl  mt-2">3</span>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-lg shadow-md bg-blue-300">
        <h2 className="text-lg  mb-4">Personal Loan</h2>
        <div className="grid grid-cols-3 gap-4">
          {/* Approve Loan */}
          <div className="border p-4 rounded-lg flex flex-col items-center">
            <h3 className="text-lg ">Approve Loan</h3>
            <span className="text-xl  mt-2">10</span>
          </div>

          {/* Pending Loan */}
          <div className="border p-4 rounded-lg flex flex-col items-center">
            <h3 className="text-lg ">Pending Loan</h3>
            <span className="text-xl mt-2">5</span>
          </div>

          {/* Rejected Loans */}
          <div className="border p-4 rounded-lg flex flex-col items-center">
            <h3 className="text-lg ">Rejected Loans</h3>
            <span className="text-xl  mt-2">3</span>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-lg shadow-md bg-blue-300">
        <h2 className="text-lg  mb-4">Loan Against Property</h2>
        <div className="grid grid-cols-3 gap-4">
          {/* Approve Loan */}
          <div className="border p-4 rounded-lg flex flex-col items-center">
            <h3 className="text-lg ">Approve Loan</h3>
            <span className="text-xl  mt-2">10</span>
          </div>

          {/* Pending Loan */}
          <div className="border p-4 rounded-lg flex flex-col items-center">
            <h3 className="text-lg ">Pending Loan</h3>
            <span className="text-xl mt-2">5</span>
          </div>

          {/* Rejected Loans */}
          <div className="border p-4 rounded-lg flex flex-col items-center">
            <h3 className="text-lg ">Rejected Loans</h3>
            <span className="text-xl  mt-2">3</span>
          </div>
        </div>
      </div>
    </div>
          </div>
          <h6 className="m-0 text-blue-900 text-lg">Applied Loans</h6>
          <div className="section p-0">
            <div className="scrollable">
              <table>
                <thead className="bg-blue-300">
                  <tr>
                    <th>Loan Type</th>
                    <th>Applied on</th>
                    <th>Status</th>
                    <th>Last Update</th>
                    <th>Customer Detail</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.loans.map((loan, index) => (
                    <tr
                      key={loan.id}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-blue-25"
                      } border-b border-gray-300`}
                    >
                      <td>
                        <h6 className="title">{loan.type}</h6>
                      </td>
                      <td>{postDateFormatter.format(loan.date_applied)}</td>
                      <td>
                        <span
                          className={`badge ${badgeColors[loan.status]} w-40`}
                        >
                          {loan.status}
                        </span>
                      </td>
                      <td>{postDateFormatter.format(loan.last_update)}</td>
                      <td>
                        <Link
                          to={`/loan/l/${loan.id}`}
                          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 "
                        >
                          <ViewIcon className="mr-2" />
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Pagination totalPages={1} currentPage={0} setSearch={setSearch} />
        </div>
        <button
          className="fixed bottom-5 right-5 bg-blue-600 hover:bg-blue-600 text-white text-lg rounded-full w-12 h-12 flex items-center justify-center"
          onClick={handleClick}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
