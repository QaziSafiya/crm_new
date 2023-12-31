import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer.jsx";
import CloseCircleIcon from "../components/icons/CloseCircleIcon.jsx";
import UserIcon from "../components/icons/UserIcon.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";
import useDashboard from "../hooks/useDashboard.js";
import { Pie } from "react-chartjs-2";
import { BASE_URL } from "../constants.js";
import axios from "axios";
import useAuth from "../hooks/useAuth.js";

export default function Dashboard() {
  const { currentUser: { token } } = useAuth((store) => store.auth);
  const [data, loading, error] = useDashboard();
  const [invoices, setInvoices] = useState([])
  const [fetchedData, setFetchedData] = useState([]);
  const [insuranceList, setInsuranceList] = useState([]);

  const statsData = [
    { category: "Insurance", totalApplications: `${insuranceList.length}` },
    { category: "Loans", totalApplications: `${fetchedData.length}` },
    { category: "Invoice", totalApplications: `${invoices.length}` },
    { category: "Electricity Bill", totalApplications: 0 },
  ];

  const getInvoices = async () => {

    await fetch(`${BASE_URL}/invoice/invoices`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setInvoices(data.invoices);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchData = async () => {

    try {
      const response = await axios.get(`${BASE_URL}/loan/applications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {

        // console.log(response.data.data.applications)
        setFetchedData(response.data.data.applications); // Set fetched data in the state

      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Failed to fetch API', error);
    }
  }

  const fetchInsuranceList = async () => {

    // Replace 'your-api-endpoint' with your actual API endpoint
    await fetch(`${BASE_URL}/insourance/getAll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setInsuranceList(data.applications
        );
        // Do something with the response data if needed
      })
      .catch((error) => {
        console.error(error);
        // Handle error if needed
      });
  };

  useEffect(() => {
    getInvoices()
    fetchData();
    fetchInsuranceList();
  }, []);
  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="inner-container">
          <h6 className="text-secondary">Dashboard</h6>
          {loading ? (
            <div className="flex jc-center ai-center h-100pc">
              <span className="spinner small"></span>
            </div>
          ) : error ? (
            <div className="error-message">
              <CloseCircleIcon />
              {error}
            </div>
          ) : (
            <div>
              <div className="flex g-1rem flex-wrap">
                <div className="card g-1rem">
                  <div className="card-header">
                    <UserIcon />
                    <span className="text-secondary text-large">
                      Total Users
                    </span>
                  </div>
                  <div className="card-body">
                    <h5>{data.usersCount}</h5>
                  </div>
                </div>

                <div className="card g-1rem ">
                  <div className="card-header">
                    <UserIcon />
                    <span className="text-secondary text-large ">
                      Applications
                    </span>
                  </div>
                  <div className="card-body">
                    <h5>{invoices.length + fetchedData.length + insuranceList.length}</h5>
                  </div>
                </div>
              </div>
              <h1 className="text-secondary mt-10">Financial Details</h1>
              <div className="container mx-auto mt-3">
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                      <tr>
                        <th className="py-3 px-6 bg-indigo-500 text-white font-semibold uppercase">
                          Category
                        </th>
                        <th className="py-3 px-6 bg-indigo-500 text-white font-semibold uppercase">
                          Total Applications
                        </th>
                        <th className="py-3 px-6 bg-indigo-500 text-white font-semibold uppercase">
                          Jan
                        </th>
                        <th className="py-3 px-6 bg-indigo-500 text-white font-semibold uppercase">
                          Feb
                        </th>
                        <th className="py-3 px-6 bg-indigo-500 text-white font-semibold uppercase">
                          Mar
                        </th>
                        <th className="py-3 px-6 bg-indigo-500 text-white font-semibold uppercase">
                          Apr
                        </th>
                        <th className="py-3 px-6 bg-indigo-500 text-white font-semibold uppercase">
                          May
                        </th>
                        <th className="py-3 px-6 bg-indigo-500 text-white font-semibold uppercase">
                          Jun
                        </th>
                        <th className="py-3 px-6 bg-indigo-500 text-white font-semibold uppercase">
                          Jul
                        </th>
                        <th className="py-3 px-6 bg-indigo-500 text-white font-semibold uppercase">
                          Aug
                        </th>
                        <th className="py-3 px-6 bg-indigo-500 text-white font-semibold uppercase">
                          Sep
                        </th>
                        <th className="py-3 px-6 bg-indigo-500 text-white font-semibold uppercase">
                          Oct
                        </th>
                        <th className="py-3 px-6 bg-indigo-500 text-white font-semibold uppercase">
                          Nov
                        </th>
                        <th className="py-3 px-6 bg-indigo-500 text-white font-semibold uppercase">
                          Dec
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {statsData.map((item, index) => (
                        <tr
                          key={item.category}
                          className={index % 2 === 0 ? "bg-gray-100" : ""}
                        >
                          <td className="py-4 px-6 border-l">
                            {item.category}
                          </td>
                          <td className="py-4 px-6 border-l">
                            {item.totalApplications}
                          </td>
                          <td className="py-4 px-6 border-l">0</td>
                          <td className="py-4 px-6 border-l">0</td>
                          <td className="py-4 px-6 border-l">0</td>
                          <td className="py-4 px-6 border-l">0</td>
                          <td className="py-4 px-6 border-l">0</td>
                          <td className="py-4 px-6 border-l">0</td>
                          <td className="py-4 px-6 border-l">0</td>
                          <td className="py-4 px-6 border-l">0</td>
                          <td className="py-4 px-6 border-l">0</td>
                          <td className="py-4 px-6 border-l">0</td>
                          <td className="py-4 px-6 border-l">0</td>
                          <td className="py-4 px-6 border-l">0</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <h1 className="text-secondary mt-10">Financial Statistics</h1>
              {/* <div className="flex justify-center items-center h-screen mt-10 ml-0"> */}
              <div className="grid grid-cols-3 gap-4 mt-10">
                <div className="chart-container bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                  <h1 className="text-center text-xl font-bold mb-4">Insurance Statistics</h1>
                  <div className="h-80 w-full flex justify-center items-center">
                    <Pie data={insuranceChartData} />
                  </div>
                </div>

                <div className="chart-container bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                  <h1 className="text-center text-xl font-bold mb-4">Loan Statistics</h1>
                  <div className="h-80 w-full flex justify-center items-center">
                    <Pie data={loanChartData} />
                  </div>
                </div>

                <div className="chart-container bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                  <h1 className="text-center text-xl font-bold mb-4">ITR Statistics</h1>
                  <div className="h-80 w-full flex justify-center items-center">
                    <Pie data={ITRChart} />
                  </div>
                </div>

                <div className="chart-container bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                  <h1 className="text-center text-xl font-bold mb-4">Bill Payment Statistics</h1>
                  <div className="h-80 w-full flex justify-center items-center">
                    <Pie data={BillPaymentPieChart} />
                  </div>
                </div>
              </div>
            </div>
            // </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}



const insuranceChartData = {
  labels: [
    "Policies Sold",
    "Premium Collections",
    "Top Products",
    "Claims Processed",
    "Customer Satisfaction",
  ],
  datasets: [
    {
      data: [300, 500, 200, 150, 400],
      backgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#FF8C00",
      ],
      hoverBackgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#FF8C00",
      ],
    },
  ],
};

const loanChartData = {
  labels: [
    "Applications Received",
    "Approval Rate",
    "Average Loan Amount",
    "Top Loan Types",
    "Repayment Status",
  ],
  datasets: [
    {
      data: [100, 80, 5000, 200, 90],
      backgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#FF8C00",
      ],
      hoverBackgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#FF8C00",
      ],
    },
  ],
};

const ITRChart = {
  labels: [
    "Filed Tax Returns",
    "Average Refund/Amount",
    "Deductions Claimed",
    "Compliance Rate",
  ],
  datasets: [
    {
      data: [1000, 2500, 80, 3, 95],
      backgroundColor: ["#FF6384", "#36A2EB", "#4BC0C0", "#FF8C00"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#4BC0C0", "#FF8C00"],
    },
  ],
};

const BillPaymentPieChart = {
  labels: [
    "Bills Processed",
    "Average Payment Amount",
    "Popular Categories",
    "Payment Success Rate",
  ],
  datasets: [
    {
      data: [500, 120, 150, 250, 80],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF8C00"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF8C00"],
    },
  ],
};
