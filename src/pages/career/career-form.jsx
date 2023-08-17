import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import useAuth from "../../hooks/useAuth";

const CareerForm = () => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    careerId: "5",
    name: "",
    address: "",
    pin: "",
    email: "",
    mobile: "",
    skills: "",
    gender: "male",
    cv: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("careerId", formData.careerId);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("pin", formData.pin);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("mobile", formData.mobile);
      formDataToSend.append("skills", formData.skills);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("cv", formData.cvFile); // Append the file here
  
      const response = await fetch("https://api.itaxeasy.com/career/create", {
        method: "POST",
        headers: {
          // No need to set Content-Type since FormData handles it
          Authorization: `Basic ${token}`,
        },
        body: formDataToSend,
      });
  
      let res = await response.json();
      console.log(res);
  
      if (response.ok) {
        // Handle successful submission here
        console.log("Data submitted successfully!");
      } else {
        // Handle error here
        console.error("Error submitting data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
  
    if (type === "file") {
      const filename = files[0].name;
      setFormData((prevData) => ({
        ...prevData,
        [name]: filename,
        cvFile: files[0], // Store the actual file in cvFile field
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="inner-container">
          <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full">
              <h1 className="text-blue-900 mb-4">Career Application Form</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-2 text-primary font-bold">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2 text-primary font-bold">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    required
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
               
                <div className="mb-4">
                  <label className="block mb-2 text-primary font-bold">
                    PIN
                  </label>
                  <input
                    type="text"
                    name="pin"
                    value={formData.pin}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-primary font-bold">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-primary font-bold">
                    Mobile
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-primary font-bold">
                    Skills
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block mb-2 text-primary font-bold">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-primary font-bold">
                    CV
                  </label>
                  <input
                    type="file"
                    name="cv"
                    accept=".pdf"
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    required
                  />
                </div>
                <div className="mt-6 flex justify-center">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerForm;
