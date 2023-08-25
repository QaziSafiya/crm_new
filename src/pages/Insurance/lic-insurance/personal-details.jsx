import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import girl from "../images/girl.png";
import boy from "../images/boy.png";
import axios from "axios";
import { Link } from "react-router-dom";

const PersonalDetails = () => {
  const [currentSection, setCurrentSection] = useState(1); // Current visible section
  const [selectedGender, setSelectedGender] = useState(null);
  const [pinCode, setPinCode] = useState('');
  const [cityName, setCityName] = useState('');
  const pinCodeInputRef = useRef(null);

  useEffect(() => {
    if (currentSection === 3 && pinCodeInputRef.current) {
      pinCodeInputRef.current.focus();
    }
  }, [currentSection]);

  useEffect(() => {
    if (pinCode.length === 6) {
      fetchCityName();
    }
  }, [pinCode]);

  const fetchCityName = async () => {
    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pinCode}`);
      const data = response.data[0];

      if (data.Status === 'Success') {
        const city = data.PostOffice[0].District;
        setCityName(city);
      } else {
        setCityName('');
      }
    } catch (error) {
      console.error('Error fetching city name:', error);
    }
  };

  const handleNextSection = () => {
    if (currentSection < 4) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePreviousSection = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 bg-white p-8">
        <Topbar />
        <div className="inner-container">
          <div className="flex items-center mb-4">
            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full mx-1 ${
                  currentSection === index + 1 ? "bg-blue-500" : "bg-yellow-300" // Use a brighter color here
                }`}
              ></div>
            ))}
          </div>

          {currentSection === 1 && (
            <div >
              {/* Section 1 content */}
              <p className="mb-4 text-lg font-semibold">
                Section 1: Personal Details
              </p>
              
              <div className="flex mb-4">
                <div className="w-1/2 p-4 rounded-lg shadow-md ml-2 border-2">
                <label htmlFor="gender" className="text-sm ml-1">
                      Gender
                    </label>
                  <div className="flex mb-4">
                    <div
                      className={`w-1/2 p-4 bg-gray-100 rounded-lg shadow-md mr-2 mt-2 flex items-center cursor-pointer ${
                        selectedGender === "male"
                          ? "bg-blue-500 text-blue-500"
                          : ""
                      }`}
                      onClick={() => setSelectedGender("male")}
                    >
                      <img src={boy} alt="Male Logo" className="w-8 h-8 mr-2" />
                      <label htmlFor="male" className="text-lg font-semibold">
                        Male
                      </label>
                    </div>
                    <div
                      className={`w-1/2 p-4 bg-gray-100 rounded-lg shadow-md ml-2 mt-2 flex items-center cursor-pointer ${
                        selectedGender === "female"
                          ? "bg-blue-500 text-blue-500"
                          : ""
                      }`}
                      onClick={() => setSelectedGender("female")}
                    >
                      <img
                        src={girl}
                        alt="Female Logo"
                        className="w-8 h-8 mr-2"
                      />
                      <label htmlFor="female" className="text-lg font-semibold">
                        Female
                      </label>
                    </div>
                  </div>

                  <div className="flex mt-2">
                    <div className="flex flex-col w-1/2 pr-2">
                      <label htmlFor="fullName" className="text-sm ml-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        className="border rounded-lg p-3 mt-1 focus:outline-none focus:ring focus:border-blue-500 border-2"
                        placeholder="Full Name"
                      />
                    </div>
                    <div className="flex flex-col w-1/2 pl-2">
                      <label htmlFor="mobileNumber" className="text-sm ml-1">
                        Mobile Number
                      </label>
                      <input
                        type="text"
                        id="mobileNumber"
                        className="border rounded-lg p-3 mt-1 focus:outline-none focus:ring focus:border-blue-500 border-2"
                        placeholder="Mobile Number"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col h-24  mt-4">
                    <label htmlFor="email" className="text-sm ml-1">
                      Email Id
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="border rounded-lg p-3 mt-2 focus:outline-none focus:ring focus:border-blue-500 h-24 border-2"
                      placeholder="Email"
                    />
                  </div>
                </div>
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2"
                onClick={handleNextSection}
              >
                Next
              </button>
            </div>
          )}
          {currentSection === 2 && (
            <div>
              {/* Section 2 content */}
              <p className="mb-4 text-lg font-semibold">
                Section 2: Who would you like to insure?
              </p>
              <div className="w-1/2 p-4  rounded-lg shadow-lg ml-2 border-2">
                <div className="flex flex-col space-y-2">
                  <div className="mb-2 border rounded-lg p-2 flex justify-between items-center">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="self"
                        className="form-radio text-blue-500 focus:ring focus:ring-blue-300 mr-2"
                      />
                      <span className="text-lg text-gray-700">Self</span>
                    </label>

                    <div>
                      <select className="border rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500">
                      <option value="option1">Select Age</option>
                        <option value="option1">18 Years</option>
                        <option value="option2">19 Years</option>
                        <option value="option3">20 Years</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-2 border rounded-lg p-2 flex justify-between items-center">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="spouse"
                        className="form-radio text-blue-500 focus:ring focus:ring-blue-300 mr-2"
                      />
                      <span className="text-lg text-gray-700">Spouse</span>
                    </label>

                    <div>
                      <select className="border rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500">
                      <option value="option1">Select Age</option>
                      <option value="option1">18 Years</option>
                        <option value="option2">19 Years</option>
                        <option value="option3">20 Years</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-2 border rounded-lg p-2 flex justify-between items-center">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="son"
                        className="form-radio text-blue-500 focus:ring focus:ring-blue-300 mr-2"
                      />
                      <span className="text-lg text-gray-700">Son</span>
                    </label>

                    <div>
                      <select className="border rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500">
                      <option value="option1">Select Age</option>
                        <option value="option1">3 Months</option>
                        <option value="option2">4 Months</option>
                        <option value="option3">5 Months</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-2 border rounded-lg p-2 flex justify-between items-center">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="daughter"
                        className="form-radio text-blue-500 focus:ring focus:ring-blue-300 mr-2"
                      />
                      <span className="text-lg text-gray-700">Daughter</span>
                    </label>

                    <div>
                      <select className="border rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500">
                      <option value="option1">Select Age</option>
                        <option value="option1">3 Months</option>
                        <option value="option2">4 Months</option>
                        <option value="option3">5 Months</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-2 border rounded-lg p-2 flex justify-between items-center">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="father"
                        className="form-radio text-blue-500 focus:ring focus:ring-blue-300 mr-2"
                      />
                      <span className="text-lg text-gray-700">Father</span>
                    </label>

                    <div>
                      <select className="border rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500">
                        <option value="option1">Select Age</option>
                        <option value="option1">36 Years</option>
                        <option value="option2">37 Years</option>
                        <option value="option3">38 Years</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-2 border rounded-lg p-2 flex justify-between items-center">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="mother"
                        className="form-radio text-blue-500 focus:ring focus:ring-blue-300 mr-2"
                      />
                      <span className="text-lg text-gray-700">Mother</span>
                    </label>

                    <div>
                      <select className="border rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500">
                      <option value="option1">Select Age</option>
                        <option value="option1">36 Years</option>
                        <option value="option2">37 Years</option>
                        <option value="option3">38 Years</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="mr-2 bg-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-400 mt-5 ml-2"
                onClick={handlePreviousSection}
              >
                Back
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-5 "
                onClick={handleNextSection}
              >
                Next
              </button>
            </div>
          )}
          {currentSection === 3 && (
            <div>
              {/* Section 3 content */}
              <p className="mb-4 text-lg font-semibold">
                Section 3: Tell us where you live
              </p>
              <div className="flex mb-4">
            <div className=" p-4 border-2 rounded-lg shadow-md ml-2 border-2">
                
              
              <label htmlFor="pinCode" className="text-sm mr-1">
                Enter PIN Code
              </label>
              <input
                type="text"
                id="pinCode"
                ref={pinCodeInputRef} // Attach the ref
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                className="border rounded-lg p-3 mt-1 focus:outline-none focus:ring focus:border-blue-500"
                placeholder="PIN Code"
              />
              <label htmlFor="cityName" className="text-sm mt-2 ml-2 mr-1">
                City Name
              </label>
              <input
                type="text"
                id="cityName"
                value={cityName}
                readOnly
                className="border rounded-lg p-3 mt-1 focus:outline-none focus:ring focus:border-blue-500 bg-gray-100"
                placeholder="City Name"
              />
            </div>
          </div>
              <button
                className="mr-2 bg-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-400 ml-2"
                onClick={handlePreviousSection}
              >
                Back
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleNextSection}
              >
                Next
              </button>
            </div>
          )}
          {currentSection === 4 && (
            <div>
              {/* Section 4 content */}
              <p className="mb-4 text-lg font-semibold">
                Section 4: Any of the insured member have a medical history?
              </p>
              {/* <div className="flex mb-4"> */}
  {/* <div className="flex w-1/2 p-4 rounded-lg shadow-md ml-2"> */}
    
    <div className="flex w-24 p-2 rounded-lg mb-4  border-gray-300 pt-4 border-2 ">
      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          name="confirmation"
          className="form-radio text-blue-500 focus:ring focus:ring-blue-300 mr-2"
        />
        <span className="text-lg text-gray-700">Yes</span>
      </label>
    </div>
    <div className="flex w-24 p-2 rounded-lg mb-4  border-gray-300 pt-4 border-2">
      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          name="confirmation"
          className="form-radio text-blue-500 focus:ring focus:ring-blue-300 mr-2"
        />
        <span className="text-lg text-gray-700">No</span>
      </label>
    </div>
  {/* </div> */}
{/* </div> */}

    
              <button
                className="mr-2 bg-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-400"
                onClick={handlePreviousSection}
              >
                Back
              </button>
              
              <Link to="/insurance/lic/health">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Next
              </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
