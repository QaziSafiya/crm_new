import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "./adminInsurance.css";

const insuranceRequests = [
  {
    id: "01",
    name: "John",
    email: "john@gmail.com",
    mobile: "84780258080",
  },
  {
    id: "02",
    name: "Rocky",
    email: "rocky@gmail.com",
    mobile: "88821828828",
  },
  // Add more data objects as needed
];

function InsuranceData() {
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleViewClick = (request) => {
    setSelectedRequest(request);
  };

  return (
    <>
      <div className="container">
        <Sidebar />
        <div className="main">
          <Topbar />
          <div className="inner-container">
            <div className="flex jc-between ai-center">
              <h6 className="text-secondary">Admin</h6>
            </div>
            <h6 className="m-0">Applied Insurance Requests</h6>
            <div className="section p-0">
              <div className="scrollable">
                <table className="users-table w-full border-collapse border border-gray-300">
                  <thead className="users-table">
                    <tr className="bg-gray-100 border-b border-gray-300">
                      <th className="px-4 py-2">ID</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Email</th>
                      <th className="px-4 py-2">Mobile</th>
                      <th className="px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {insuranceRequests.map((request) => (
                      <tr key={request.id} className="border-b border-gray-300">
                        <td className="px-4 py-2">{request.id}</td>
                        <td className="px-4 py-2">{request.name}</td>
                        <td className="px-4 py-2">{request.email}</td>
                        <td className="px-4 py-2">{request.mobile}</td>
                        <td className="px-4 py-2">
                          <button
                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                            onClick={() => handleViewClick(request)}
                          >
                            View
                          </button>
                          <button className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Render the selected request details */}
      {selectedRequest && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Selected Insurance Request</h2>
            <p><strong>ID:</strong> {selectedRequest.id}</p>
            <p><strong>Name:</strong> {selectedRequest.name}</p>
            <p><strong>Email:</strong> {selectedRequest.email}</p>
            <p><strong>Mobile:</strong> {selectedRequest.mobile}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              onClick={() => setSelectedRequest(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default InsuranceData;
