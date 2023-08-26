import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import ArrowUpIcon from "../../../components/icons/ArrowUpIcon";
import ArrowDownIcon from "../../../components/icons/ArrowDownIcon";
import girl from "../images/girl.png";

const LicCarPlans = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMinimized1, setIsMinimized1] = useState(false);
  const [isMinimized2, setIsMinimized2] = useState(false);
  const [isMinimized3, setIsMinimized3] = useState(false);



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
            <div>
              <p>BAJAJ-ASPRE-STD</p>
              <p>BIKE | PETROL | </p>
            </div>

            <div>
              <p>PREVIOUS POLICY TYPE</p>
              <p>OWNERSHIP</p>
            </div>

            <div>
              <p>PREVIOUS POLICY EXPIRY</p>
              <p>REGISTERED ON</p>
            </div>

            <div>
              <p>PREVIOUS NCB</p>
              <p>NEW NCB</p>
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
                    <p>CPA</p>
                    <button
                      className="text-blue-500 underline cursor-pointer"
                      onClick={handleToggle}
                    >
                      {isMinimized ? <ArrowUpIcon /> : <ArrowDownIcon />}
                    </button>
                  </div>

                  {!isMinimized && (
                    <div className="flex items-center">
                      <input type="checkbox" id="checkbox1" className="mr-2" />
                      <label htmlFor="checkbox1" className="text-sm">
                        Compulsory Personal Accident 1
                      </label>
                    </div>
                  )}
                  {!isMinimized && (
                    <div className="flex items-center">
                      <input type="checkbox" id="checkbox2" className="mr-2" />
                      <label htmlFor="checkbox2" className="text-sm">
                        Compulsory Personal Accident 2
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-2 bg-white">
                <div className="p-2">
                  <div className="flex justify-between">
                    <p>Addons</p>
                    <button
                      className="text-blue-500 underline cursor-pointer"
                      onClick={handleToggle1}
                    >
                      {isMinimized1 ? <ArrowUpIcon /> : <ArrowDownIcon />}
                    </button>
                  </div>

                  {!isMinimized1 && (
                    <div className="flex items-center">
                      <input type="checkbox" id="checkbox1" className="mr-2" />
                      <label htmlFor="checkbox1" className="text-sm">
                        Zero Depreciation
                      </label>
                    </div>
                  )}
                  {!isMinimized1 && (
                    <div className="flex items-center">
                      <input type="checkbox" id="checkbox2" className="mr-2" />
                      <label htmlFor="checkbox2" className="text-sm">
                        Road Side Assitance
                      </label>
                    </div>
                  )}
                  {!isMinimized1 && (
                    <div className="flex items-center">
                      <input type="checkbox" id="checkbox2" className="mr-2" />
                      <label htmlFor="checkbox2" className="text-sm">
                        Consumable
                      </label>
                    </div>
                  )}
                  {!isMinimized1 && (
                    <div className="flex items-center">
                      <input type="checkbox" id="checkbox2" className="mr-2" />
                      <label htmlFor="checkbox2" className="text-sm">
                        Engine Protector
                      </label>
                    </div>
                  )}
                  {!isMinimized1 && (
                    <div className="flex items-center">
                      <input type="checkbox" id="checkbox2" className="mr-2" />
                      <label htmlFor="checkbox2" className="text-sm">
                        Emergency Medical Expenses
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-2 bg-white">
                <div className="p-2">
                  <div className="flex justify-between">
                    <p>Accessories</p>
                    <button
                      className="text-blue-500 underline cursor-pointer"
                      onClick={handleToggle2}
                    >
                      {isMinimized2 ? <ArrowUpIcon /> : <ArrowDownIcon />}
                    </button>
                  </div>

                  {!isMinimized2 && (
                    <div className="flex items-center">
                      <input type="checkbox" id="checkbox1" className="mr-2" />
                      <label htmlFor="checkbox1" className="text-sm">
                        Electrical Accessories
                      </label>
                    </div>
                  )}
                  {!isMinimized2 && (
                    <div className="flex items-center">
                      <input type="checkbox" id="checkbox2" className="mr-2" />
                      <label htmlFor="checkbox2" className="text-sm">
                     Non Electrical Accessories
                      </label>
                    </div>
                  )}
                  
                </div>
              </div>

              <div className="p-2 bg-white">
                <div className="p-2">
                  <div className="flex justify-between">
                    <p>Additional Covers</p>
                    <button
                      className="text-blue-500 underline cursor-pointer"
                      onClick={handleToggle3}
                    >
                      {isMinimized3 ? <ArrowUpIcon /> : <ArrowDownIcon />}
                    </button>
                  </div>

                  {!isMinimized3 && (
                    <div className="flex items-center">
                      <input type="checkbox" id="checkbox1" className="mr-2" />
                      <label htmlFor="checkbox1" className="text-sm">
                        Unnamed Passenger
                      </label>
                    </div>
                  )}
                  {!isMinimized3 && (
                    <div className="flex items-center">
                      <input type="checkbox" id="checkbox2" className="mr-2" />
                      <label htmlFor="checkbox2" className="text-sm">
                     LL Paid driver
                      </label>
                    </div>
                  )}
                  {!isMinimized3 && (
                    <div className="flex items-center">
                      <input type="checkbox" id="checkbox2" className="mr-2" />
                      <label htmlFor="checkbox2" className="text-sm">
                     Geographical Extension
                      </label>
                    </div>
                  )}
                  
                </div>
              </div>
            </div>

            <div className="w-3/4 border-2 grid grid-cols-2 gap-2">

              <div className=" bg-white shadow-md rounded-lg p-4  items-center">
                <div className="flex justify-between">
                  <img
                    className="w-10 h-10 mr-4"
                    src={girl}
                    alt="Company Logo"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">
                      Insurance Company XYZ
                    </h3>
                    <p className="text-base font-semibold">
                      IDV Value <br></br> ₹12745{" "}
                    </p>
                  </div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Buy Now <br></br>
                    ₹5393
                  </button>
                </div>
                <p className="text-blue-400 flex justify-end mr-2 mt-1">
                  Incl GST
                </p>
                <hr></hr>
                <div className="flex justify-between">
                  <div>Base Premium</div>
                  <div>₹4025</div>
                </div>
                <hr></hr>
                <div className="flex justify-between">
                  <div>Cumpolsary Personal Accident</div>
                  <div>₹331</div>
                </div>
                <hr></hr>
                <div className="flex justify-between">
                  <div>Cashless Garages</div>
                  <div>Premium Backup</div>
                </div>
              </div>

              <div className=" bg-white shadow-md rounded-lg p-4 items-center">
                <div className="flex justify-between">
                  <img
                    className="w-10 h-10 mr-4"
                    src={girl}
                    alt="Company Logo"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">
                      Insurance Company XYZ
                    </h3>
                    
                    <p className="text-base font-semibold">
                      IDV Value <br></br> ₹12745{" "}
                    </p>
                  </div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Buy Now <br></br>
                    ₹5393
                  </button>
                </div>
                <p className="text-blue-400 flex justify-end mr-2 mt-1">
                  Incl GST
                </p>
                <hr></hr>
                <div className="flex justify-between">
                  <div>Base Premium</div>
                  <div>₹4025</div>
                </div>
                <hr></hr>
                <div className="flex justify-between">
                  <div>Cumpolsary Personal Accident</div>
                  <div>₹331</div>
                </div>
                <hr></hr>
                <div className="flex justify-between">
                  <div>Cashless Garages</div>
                  <div>Premium Backup</div>
                </div>
              </div>

              <div className=" bg-white shadow-md rounded-lg p-4  items-center">
                <div className="flex justify-between">
                  <img
                    className="w-10 h-10 mr-4"
                    src={girl}
                    alt="Company Logo"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">
                      Insurance Company XYZ
                    </h3>
                    <p className="text-base font-semibold">
                      IDV Value <br></br> ₹12745{" "}
                    </p>
                  </div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Buy Now <br></br>
                    ₹5393
                  </button>
                </div>
                <p className="text-blue-400 flex justify-end mr-2 mt-1">
                  Incl GST
                </p>
                <hr></hr>
                <div className="flex justify-between">
                  <div>Base Premium</div>
                  <div>₹4025</div>
                </div>
                <hr></hr>
                <div className="flex justify-between">
                  <div>Cumpolsary Personal Accident</div>
                  <div>₹331</div>
                </div>
                <hr></hr>
                <div className="flex justify-between">
                  <div>Cashless Garages</div>
                  <div>Premium Backup</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LicCarPlans;
