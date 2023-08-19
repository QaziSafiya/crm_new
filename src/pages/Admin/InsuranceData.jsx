import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "./adminInsurance.css";
import axios from "axios";
import { BASE_URL } from "../../constants";



function InsuranceData() {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [insuranceList, setInsuranceList] = useState([]);

  useEffect(() => {
    fetchInsuranceList();
  }, []);

  const fetchInsuranceList = async () => {
    let token = JSON.parse(localStorage.getItem("itaxData"));
    console.log(token.token);

    // Replace 'your-api-endpoint' with your actual API endpoint
    await fetch(`${BASE_URL}/insourance/getAll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setInsuranceList(data.applications
          );
        // Do something with the response data if needed
      })
      .catch((error) => {
        console.error(error);
        // Handle error if needed
      });
  };

  const handleDeleteClick = async (id) => {
    try {
      let token = JSON.parse(localStorage.getItem("itaxData"));

      await axios.delete(`${BASE_URL}/insourance/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });

      // Remove the deleted request from the list
      setInsuranceList((prevList) =>
        prevList.filter((request) => request.id !== id)
      );
    } catch (error) {
      console.error("Error deleting insurance request:", error);
    }
  };

  

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
                    {insuranceList && insuranceList.map((request) => (
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
                          <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleDeleteClick(request.id)}
              >
                Delete
              </button>
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
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Request Details</h2>


            <p><strong>ID:</strong> {selectedRequest.id}</p>
            <p><strong>Name:</strong> {selectedRequest.name}</p>
            <p><strong>Gender:</strong> {selectedRequest.gender}</p>
            <p><strong>Marital Status:</strong> {selectedRequest.maritalStatus}</p>
            <p><strong>Insurance Type:</strong> {selectedRequest.type}</p>
            <p><strong>Email:</strong> {selectedRequest.email}</p>
            <p><strong>Mobile:</strong> {selectedRequest.mobile}</p>
            <p><strong>Address:</strong> {selectedRequest.address}</p>
            <p><strong>Created At:</strong> {selectedRequest.createdAt}</p>


            
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
