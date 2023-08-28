import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import car from "../images/car.png"


import { Link } from "react-router-dom";

const CarInfo = () => {
  const [currentSection, setCurrentSection] = useState(1); // Current visible section
  const [selectedFuelType, setSelectedFuelType] = useState("Petrol"); // Initial selection is 'Petrol'
  const [selectedCity, setSelectedCity] = useState(null); // State to track selected city

  const handleCitySelection = (city) => {
    setSelectedCity(city);
  };


  const handleNextSection = () => {
    if (currentSection < 6) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePreviousSection = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleFuelTypeSelection = (fuelType) => {
    setSelectedFuelType(fuelType);
  };

  const logoTitleArray = [
    {
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbDmyKChlb7JVQn0DPQmGj0TiGGOcOok0lhgvA3gPoJg&s",
      title: "AUDI",
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Fiat_Automobiles_logo.svg/2048px-Fiat_Automobiles_logo.svg.png",
      title: "FIAT",
    },
    {
      logo: "https://c4.wallpaperflare.com/wallpaper/762/50/535/cars-ford-wallpaper-preview.jpg",
      title: "FORD",
    },
    {
      logo: "https://logos-world.net/wp-content/uploads/2021/03/Honda-Logo.png",
      title: "HONDA",
    },
    {
      logo: "https://logos-world.net/wp-content/uploads/2021/03/Hyundai-Logo.png",
      title: "HYUNDAI",
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/KIA_logo2.svg/2560px-KIA_logo2.svg.png",
      title: "KIA",
    },
    {
      logo: "https://companieslogo.com/img/orig/MARUTI.NS-9974f2f4.png",
      title: "MARUTI",
    },
    {
      logo: "https://www.carlogos.org/logo/Mahindra-logo.png",
      title: "MAHINDRA",
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Suzuki_logo_2.svg/2560px-Suzuki_logo_2.svg.png",
      title: "SUZUKI",
    },
    {
      logo: "https://1000logos.net/wp-content/uploads/2018/04/Mercedes-Benz-Logo.png",
      title: "MERCEDES",
    },
    {
      logo: "https://www.carlogos.org/logo/Renault-logo-2015-2048x2048.png",
      title: "RENAULT",
    },
    {
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGyQIjXxAEFlKC-D2-8Z2OjbMgE389eJzEDm2vSvg&s",
      title: "SKODA",
    },
    // Add more objects as needed
  ];

  const startYear = 1998;
  const endYear = 2023;
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => startYear + index
  );
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1  p-8">
        <Topbar />
        <div className="flex justify-center items-center mb-4">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full mx-1 ${
                currentSection === index + 1 ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
        {currentSection === 1 && (
          <div>
            {/* Section 1 content */}
            <p className="flex justify-center mb-4 text-lg font-semibold">
              Section 1: Personal Details
            </p>
            <div className="flex justify-center rounded-full mb-7">
              <div className="bg-gray-200 w-28 h-28 rounded-md flex items-center justify-center">
                <img src={car} alt="car" className="w-24 h-24" />
              </div>
            </div>
            <div className="flex justify-center text-2xl text-blue-500 mb-5">
              <p>Now Buy fastest Four-wheeler Insurance online in India.</p>
            </div>
            <div className="flex justify-center">
              <div className="w-1/2 shadow-md rounded-lg p-4 bg-blue-300">
                <div className="mb-4">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    className="border rounded-lg p-2 w-full mt-1 focus:outline-none focus:ring focus:border-blue-500 border-1 border-blue-500 "
                    placeholder="Full Name"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="border rounded-lg p-2 w-full mt-1 focus:outline-none focus:ring focus:border-blue-500 border-1 border-blue-500"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    className="border rounded-lg p-2 w-full mt-1 focus:outline-none focus:ring focus:border-blue-500 border-1 border-blue-500"
                    placeholder="Phone Number"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button className="flex justify-center w-24 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Proceed
              </button>
              <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2"
              onClick={handleNextSection}
            >
              Next
            </button>
            </div>
            <div className="flex justify-center mt-4">
              <p className="text-red-500">Skip for Now</p>
            </div>
            
          </div>
        )}
        {currentSection === 2 && (
  <div className="flex flex-col items-center justify-center mt-10">
    {/* Section 2 content */}
    <p className="mb-4 text-lg font-semibold">
      Section 2: Enter Registration Number
    </p>
    <div className="w-1/2 flex justify-center mb-4">
      <input
        type="text"
        id="registrationNumber"
        className="w-full border rounded-lg p-2 h-16 focus:outline-none focus:ring focus:border-blue-500 border-2  border-blue-500"
        placeholder="Enter Registration Number"
      />
    </div>
    <div className=" flex justify-center mb-4">OR</div>
    <div className="flex gap-2">
      <button className=" bg-blue-400 text-white hover:underline border-2 p-2 rounded-lg">
        Proceed Without Vehicle Number
      </button>
      <button className=" bg-blue-400 text-white text-blue-500 hover:underline border-2 p-2 rounded-lg">
        Got a New Vehicle? Click here
      </button>
    </div>
    <div className="flex gap-2 mt-4">
      <button
        className=" bg-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-400"
        onClick={handlePreviousSection}
      >
        Back
      </button>
      <button
        className=" bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleNextSection}
      >
        Next
      </button>
    </div>
  </div>
)}

        {currentSection === 3 && (
         <div className="flex flex-col items-center justify-center mt-10">
            {/* Section 3 content */}
            <p className="mb-4 text-lg font-semibold">Section 3: Brand</p>
            <div className="flex justify-center text-2xl text-blue-400">
              <p>Select the Brand of your Vehicle</p>
            </div>
            <div className="grid grid-cols-4 mt-10 mb-5 gap-3">
              {logoTitleArray.map((el) => (
                <div className="border-2 w-44 flex flex-col justify-center items-center pt-4 pb-4 ">
                  <img src={el.logo} alt="logo" className="w-16" />
                  <p>{el.title}</p>
                </div>
              ))}
            </div>
            <p className="flex justify-center text-red-600">
              Don't see Your Vehicle Brand? Click here
            </p>
            <div className="flex gap-2 mt-4">
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
          </div>
        )}
        {currentSection === 4 && (
                   <div className="flex flex-col items-center justify-center mt-10">

            {/* Section 4 content */}
            <p className="mb-4 text-lg font-semibold">
              Section 4: Select the Variant of your Vehicle
            </p>

            <div className="flex gap-10 mb-4">
  <div
    className={`border-2 p-2 pl-3 pr-3 rounded-md cursor-pointer ${
      selectedFuelType === "Petrol" ? "bg-blue-500 text-white" : ""
    }`}
    onClick={() => handleFuelTypeSelection("Petrol")}
  >
    Petrol
  </div>
  <div
    className={`border-2 p-2 pl-3 pr-3 rounded-md cursor-pointer ${
      selectedFuelType === "Diesel" ? "bg-blue-500 text-white" : ""
    }`}
    onClick={() => handleFuelTypeSelection("Diesel")}
  >
    Diesel
  </div>
</div>

<div className="flex gap-2 mt-4">
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
          </div>
        )}

        {currentSection === 5 && (
                            <div className="flex flex-col items-center justify-center mt-10">

            {/* Section 4 content */}
            <p className=" mb-4 text-lg font-semibold">
              Section 5: Enter RTO Details
            </p>
            <div className="w-1/2 grid grid-cols-2 mb-5 ">
              <div className={`border-2 p-3 rounded-md ${
                selectedCity === 'Delhi' ? 'bg-blue-500 text-white' : 'bg-blue-400 text-white'
              } cursor-pointer`}
              onClick={() => handleCitySelection('Delhi')}>
                Delhi
              </div>

              <div className={`border-2 p-3 rounded-md ${
                selectedCity === 'Gurgaon' ? 'bg-blue-500 text-white' : 'bg-blue-400 text-white'
              } cursor-pointer`}
              onClick={() => handleCitySelection('Gurgaon')}>
                Gurgaon
              </div>

              <div className={`border-2 p-3 rounded-md ${
                selectedCity === 'Mumbai' ? 'bg-blue-500 text-white' : 'bg-blue-400 text-white'
              } cursor-pointer`}
              onClick={() => handleCitySelection('Mumbai')}>
                Mumbai
              </div>

              <div  className={`border-2 p-3 rounded-md ${
                selectedCity === 'Chennai' ? 'bg-blue-500 text-white' : 'bg-blue-400 text-white'
              } cursor-pointer`}
              onClick={() => handleCitySelection('Chennai')}>
                Chennai
              </div>

              <div  className={`border-2 p-3 rounded-md ${
                selectedCity === 'Ahemdabad' ? 'bg-blue-500 text-white' : 'bg-blue-400 text-white'
              } cursor-pointer`}
              onClick={() => handleCitySelection('Ahemdabad')}>
                Ahemdabad
              </div>

              <div  className={`border-2 p-3 rounded-md ${
                selectedCity === 'Banglore' ? 'bg-blue-500 text-white' : 'bg-blue-400 text-white'
              } cursor-pointer`}
              onClick={() => handleCitySelection('Banglore')}>
                Banglore
              </div>

              <div  className={`border-2 p-3 rounded-md ${
                selectedCity === 'Pune' ? 'bg-blue-500 text-white' : 'bg-blue-400 text-white'
              } cursor-pointer`}
              onClick={() => handleCitySelection('Pune')}>
                Pune
              </div>

              <div  className={`border-2 p-3 rounded-md ${
                selectedCity === 'Thane' ? 'bg-blue-500 text-white' : 'bg-blue-400 text-white'
              } cursor-pointer`}
              onClick={() => handleCitySelection('Thane')}>
                Thane
              </div>

              <div  className={`border-2 p-3 rounded-md ${
                selectedCity === 'Kolkata' ? 'bg-blue-500 text-white' : 'bg-blue-400 text-white'
              } cursor-pointer`}
              onClick={() => handleCitySelection('Kolkata')}>
                Kolkata
              </div>

              <div  className={`border-2 p-3 rounded-md ${
                selectedCity === 'Jaipur' ? 'bg-blue-500 text-white' : 'bg-blue-400 text-white'
              } cursor-pointer`}
              onClick={() => handleCitySelection('Jaipur')}>
                Jaipur
              </div>
            </div>
            <div className="flex gap-2 mt-4">
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
          </div>
        )}

        {currentSection === 6 && (
     <div className="flex flex-col items-center justify-center mt-10">

            {/* Section 4 content */}
            <p className=" mb-4 text-lg font-semibold">
              Section 6: Select the Vehicle Registration Year
            </p>

            <div className="w-56 border-2 p-2 bg-blue-400 flex justify-center rounded-md mb-4">
      <p className="pr-2 pt-1 text-white">Select Year</p>
      <select className="border rounded-lg p-1 mt-1 focus:outline-none focus:ring focus:border-blue-500">
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>

    <div className="flex gap-2 mt-4">

    <button
              className="mr-2 bg-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-400"
              onClick={handlePreviousSection}
            >
              Back
            </button>
            <Link to={'/insurance/lic/bike'}>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleNextSection}
            >
              Next
            </button>
            </Link>
            </div>
          </div>

          
        )}
      </div>
    </div>
  );
};

export default CarInfo;
