import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import ArrowUpIcon from "../../../components/icons/ArrowUpIcon";
import ArrowDownIcon from "../../../components/icons/ArrowDownIcon";
import girl from "../images/girl.png";
import "./bikeInfo.css";
import PlanPopup from "./popup1";
import SIIPCalculator from "./siip-calculator";
import { Link } from "react-router-dom";

const LicHealthPlanNew = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMinimized1, setIsMinimized1] = useState(false);
  const [isMinimized2, setIsMinimized2] = useState(false);
  const [isMinimized3, setIsMinimized3] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleToggle = () => {
    setIsMinimized(!isMinimized);
  };

  const handleToggle1 = () => {
    setIsMinimized1(!isMinimized1);
  };

  const handleToggle2 = () => {
    setIsMinimized2(!isMinimized2);
  };

  const handleToggle3 = () => {
    setIsMinimized3(!isMinimized3);
  };
  return (
    <div className="container">
      <Sidebar open={false} />
      <div className="main">
        <Topbar />
        <div className="inner-container">
          <div className="flex justify-between border-2 p-4 bg-blue-400 text-white">
            <div className="flex items-center">
              <img
                src="http://graphicspooja.files.wordpress.com/2014/01/lic-logo.jpg"
                alt="LIC Logo"
                className="w-20 h-16 mr-2"
              />
            </div>
            <div className="flex justify-center items-center">
              <h1 className="text-lg font-semibold ">
                Join 25 Crore+ LIC family today For a Secure Future Tomorrow
              </h1>
            </div>
            <div className="flex items-center">
              <img
                src="https://cdn4.vectorstock.com/i/1000x1000/86/68/family-logo-vector-21138668.jpg"
                alt="Family Picture"
                className="w-20 h-20 rounded-full mr-2"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="w-1/4 border-2 p-2 bg-white">
              <div className="bg-blue-400 h-10 text-white pt-2 pl-4">
                <p>Addons & Covers</p>
              </div>

              <div className="p-2 bg-white">
                <div className="p-2">
                  <div className="flex justify-between">
                    <p>Invested Amount</p>
                    <button
                      className="text-blue-500 underline cursor-pointer"
                      onClick={handleToggle}
                    >
                      {isMinimized ? <ArrowUpIcon /> : <ArrowDownIcon />}
                    </button>
                  </div>

                  {!isMinimized && (
                    <div className="flex items-center">
                      <input
                        type="text"
                        id="input1"
                        className="border rounded-lg p-2 mr-2 focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Enter value"
                      />
                      <label htmlFor="input1" className="text-sm">
                        ₹/ Month
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-2 bg-white">
                <div className="p-2">
                  <div className="flex justify-between">
                    <p>Invest for</p>
                    <button
                      className="text-blue-500 underline cursor-pointer"
                      onClick={handleToggle1}
                    >
                      {isMinimized1 ? <ArrowUpIcon /> : <ArrowDownIcon />}
                    </button>
                  </div>

                  {!isMinimized1 && (
                    <div className="flex items-center">
                      <select
                        id="select1"
                        className="border rounded-lg p-2 w-52 mr-2 focus:outline-none focus:ring focus:border-blue-300 h-12 bg-white"
                      >
                        <option value="10Yrs">10 Years</option>
                        <option value="15Yrs">15 Years</option>
                        <option value="20Yrs">20 Years</option>
                        <option value="25Yrs">25 Years</option>
                        <option value="30Yrs">30 Years</option>
                      </select>
                      <label htmlFor="select1" className="text-sm">
                        / Till 2038
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="w-3/4 border-2 grid grid-cols-2 gap-2">
              <div className=" bg-white shadow-md rounded-lg p-4  items-center h-56">
                <div className="flex justify-between">
                  <img
                    className="w-16 h-10 mr-4"
                    src={"https://i.ytimg.com/vi/90ouXuFmPrI/hqdefault.jpg"}
                    alt="Company Logo"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">SIIP</h3>
                  </div>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={handleOpenPopup}
                  >
                    Get Details
                  </button>
                  {isPopupOpen && <PlanPopup onClose={handleClosePopup} />}
                </div>

                <div className="flex justify-between items-center mt-10 mb-0">
                  <div>
                    <p>Invest</p>
                    <div className="flex gap-2">
                      <h4 className="text-lg font-semibold">₹10</h4> K/Month
                      <button className="bg-gray-300 p-1 rounded-md h-6 text-xs">
                        For 15Yrs
                      </button>
                    </div>
                    <div className="mt-4 ">
                      <Link to="/insurance/siip-cal">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm">
                          SIIP Calculator
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between items-center p-3 border-2 rounded-xl">
                    <p>You Get</p>

                    <br></br>
                    <div className="flex gap-36 ">
                      <div>
                        <button className="bg-gray-300 p-1 rounded-md h-6 text-xs">
                          In 15th Year
                        </button>

                        <p className="text-lg font-semibold text-green-500">
                          ₹ 62.8L
                        </p>
                      </div>
                      <div>
                        <p>Return</p>
                        <p className="text-lg font-semibold text-green-500">
                          16.7%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add SIIP Calculator button here */}
              </div>

              <div className=" bg-white shadow-md rounded-lg p-4  items-center h-56">
                <div className="flex justify-between">
                  <img
                    className="w-16 h-10 mr-4"
                    src={
                      "https://images.money9.com/wp-content/uploads/2021/07/LIC-Jeevan-Umang-768x432.jpg"
                    }
                    alt="Company Logo"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">Jeevan Umang</h3>
                  </div>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={handleOpenPopup}
                  >
                    Get Details
                  </button>
                  {isPopupOpen && <PlanPopup onClose={handleClosePopup} />}
                </div>

                <div className="flex justify-between items-center mt-10 mb-0">
                  <div>
                    <p>Invest</p>
                    <div className="flex gap-2">
                      <h4 className="text-lg font-semibold">₹10</h4> K/Month
                      <button className="bg-gray-300 p-1 rounded-md h-6 text-xs">
                        For 15Yrs
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between items-center p-3 border-2 rounded-xl">
                    <p>You Get</p>

                    <br></br>
                    <div className="flex gap-36 ">
                      <div>
                        <button className="bg-gray-300 p-1 rounded-md h-6 text-xs">
                          In 15th Year
                        </button>

                        <p className="text-lg font-semibold text-green-500">
                          ₹ 1.22L/yrs
                        </p>
                      </div>
                      <div>
                        <p>Bonus</p>
                        <p className="text-lg font-semibold text-green-500">
                          ₹ 1.53Cr
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" bg-white shadow-md rounded-lg p-4  items-center h-56">
                <div className="flex justify-between">
                  <img
                    className="w-16 h-10 mr-4"
                    src={
                      "https://www.paisabulls.com/storage/app/public/posts/July2021/Uza8jDr5Vgx508EfLH88.jpg"
                    }
                    alt="Beema Jyoti"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">Bima Jyoti</h3>
                  </div>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={handleOpenPopup}
                  >
                    Get Details
                  </button>
                  {isPopupOpen && <PlanPopup onClose={handleClosePopup} />}
                </div>

                <div className="flex justify-between items-center mt-10 mb-0">
                  <div>
                    <p>Invest</p>
                    <div className="flex gap-2">
                      <h4 className="text-lg font-semibold">₹10</h4> K/Month
                      <button className="bg-gray-300 p-1 rounded-md h-6 text-xs">
                        For 15Yrs
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between items-center p-3 border-2 rounded-xl">
                    <p>You Get</p>

                    <br></br>
                    <div className="flex gap-36 ">
                      <div>
                        <button className="bg-gray-300 p-1 rounded-md h-6 text-xs">
                          In 20th Year
                        </button>

                        <p className="text-lg font-semibold text-green-500">
                          ₹ 29L
                        </p>
                      </div>
                      <div>
                        <p>Return</p>
                        <p className="text-lg font-semibold text-green-500">
                          16.7%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LicHealthPlanNew;
