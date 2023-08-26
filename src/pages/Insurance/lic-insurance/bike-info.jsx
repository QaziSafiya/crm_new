import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import Topbar from '../../../components/Topbar';
import bike from "../images/bike.png"


const BikeInfo = () => {
  const [currentSection, setCurrentSection] = useState(1); // Current visible section

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
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1  p-8">
        <Topbar />
        <div className="flex items-center mb-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full mx-1 ${
                currentSection === index + 1 ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>
        {currentSection === 1 && (
          <div>
            {/* Section 1 content */}
            <p className="mb-4 text-lg font-semibold">Section 1: Personal Details</p>
            <div className='flex justify-center rounded-full'>
      <div className="bg-gray-200 w-28 h-28 rounded-md flex items-center justify-center">
            <img src={bike} alt="bike" className="w-24 h-24" />
          </div>
           

        </div>
        <div className='flex justify-center text-2xl text-blue-400'>
            <p>Now Buy fastest Two-wheeler Insurance online in India.</p>

            </div>
      <div className="flex justify-center">
        
    <div className="w-1/2 shadow-md rounded-lg p-4">
      <div className="mb-4">
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          className="border rounded-lg p-2 w-full mt-1 focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Full Name"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="border rounded-lg p-2 w-full mt-1 focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Email"
        />
      </div>
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          id="phoneNumber"
          className="border rounded-lg p-2 w-full mt-1 focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Phone Number"
        />
      </div>
    </div>
    </div>
<div className='flex justify-center mt-4'>
    <button
            className="flex justify-center w-24 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Proceed 
          </button>
          </div>
<div className='flex justify-center mt-4'>
    <p className='text-blue-500'>Skip for Now</p>
</div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleNextSection}
            >
              Next
            </button>
          </div>
        )}
        {currentSection === 2 && (
          <div>
            {/* Section 2 content */}
            <p className="mb-4 text-lg font-semibold">Section 2: Enter Registration Number</p>
            <div className="mb-4 w-1/2">
            <input
              type="text"
              id="registrationNumber"
              className="w-1/2 border rounded-lg p-2 w-full mt-1 focus:outline-none focus:ring focus:border-blue-500 h-16"
              placeholder="Enter Registration Number"
            />
          </div>
            <div className='w-1/2 flex justify-center'>OR</div>
          <button className="w-1/4 bg-blue-400 text-white hover:underline border-2 p-2 bg-transparent rounded-lg mt-2">
                Proceed Without Vehicle Number
              </button>
              <button className="w-1/4 bg-blue-400 text-white text-blue-500 hover:underline border-2 ml-2 p-2 bg-transparent rounded-lg">
                Got a New Vehicle? Click here
              </button>
              <br></br><br></br>
            <button
              className="mr-2 bg-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-400"
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
        {currentSection === 3 && (
          <div>
            {/* Section 3 content */}
            <p className="mb-4 text-lg font-semibold">Section 3: Brand</p>
            <div className='flex justify-center text-2xl text-blue-400'>
            <p>Select the Brand of your Vehicle</p>
            </div>
            <div>
                <div>
                    <img />
                    <p></p>
                </div>
            </div>
            <button
              className="mr-2 bg-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-400"
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
            <p className="mb-4 text-lg font-semibold">Section 4: Additional Details</p>
            <button
              className="mr-2 bg-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-400"
              onClick={handlePreviousSection}
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BikeInfo;
