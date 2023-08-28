import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import BajajPrevPolicyExpDate from "./BajajPrevPolicyExpDate";
import BajajPolicyCard from "./BajajPolicyCard";
import { FaRegEdit } from "react-icons/fa";

const BajajCarInsurancePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Comprehensive');
  const [toggleSwitch, setToggleSwitch] = useState('Yes');

  useEffect(() => {
    const expDateCaptured = JSON.parse(localStorage.getItem("ExpDateCaptured")) || false;
    if (!expDateCaptured) setIsModalOpen(true);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOptionToggle = (option) => {
    setSelectedOption(option);
  };

  const handleSwitchToggle = (option) => {
    setToggleSwitch(option);
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="flex flex-col p-4 sm:w-9/12">
        <Topbar />
        <section className="mt-10">
          {isModalOpen && <BajajPrevPolicyExpDate closeModal={closeModal} />}
          <div className="border flex justify-between items-center p-2 flex-wrap gap-2" style={{ color: 'gray' }}>
            <div>{policyData.length} Quotes Found</div>
            <div className="flex">
              <button
                onClick={() => handleOptionToggle('Comprehensive')}
                className={`py-2 px-4 rounded-l border border-red-500 ${selectedOption === 'Comprehensive'
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-red-500'
                  }`}
              >
                Comprehensive
              </button>
              <button
                onClick={() => handleOptionToggle('Third Party')}
                className={`py-2 px-4 rounded-r border border-red-500 ${selectedOption === 'Third Party'
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-red-500'
                  }`}
              >
                Third Party
              </button>
            </div>
            <div className="sm:gap-7 cursor-pointer flex items-center justify-between sm:border-b border-red-500">
              <p>Choose your IDV</p>
              <FaRegEdit className="hidden sm:block" />
            </div>
            <div className="flex justify-center items-center whitespace-no-wrap">
              <p className="mr-2">GST</p>
              <button
                onClick={() => handleSwitchToggle('Yes')}
                className={`px-4 sm:rounded-l-full ${toggleSwitch === 'Yes'
                  ? 'bg-green-500 text-white'
                  : 'bg-white'
                  }`}
              >
                Yes
              </button>
              <button
                onClick={() => handleSwitchToggle('No')}
                className={`px-4 sm:rounded-r-full ${toggleSwitch === 'No'
                  ? 'bg-red-500 text-white'
                  : 'bg-white'
                  }`}
              >
                No
              </button>
            </div>
          </div>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-4 mt-5 rounded-md">
            {policyData.map((item, index) => (
              <BajajPolicyCard item={item} key={index} />
            ))}
          </section>
        </section>
      </div>
    </div>
  );
};

export default BajajCarInsurancePage;


const policyData = [
  {
    valueIDV: 67400,
    buyNow: 2746,
    basePrimium: 2416,
    compulsoryPersionalAccident: 330,
    features: ['Future Xpress claims process', 'In house surveyors', '2500+ Cashless Workshops'],
    img: "https://apimotor.bajajcapitalinsurance.com/uploads/logos/future_generali.png",
  },
  {
    valueIDV: 67400,
    buyNow: 2746,
    basePrimium: 2416,
    compulsoryPersionalAccident: 330,
    features: ['Future Xpress claims process', 'In house surveyors', '2500+ Cashless Workshops'],
    img: "https://apimotor.bajajcapitalinsurance.com/uploads/logos/royal_sundaram.jpg",
  },
  {
    valueIDV: 67400,
    buyNow: 2746,
    basePrimium: 2416,
    compulsoryPersionalAccident: 330,
    features: ['Future Xpress claims process', 'In house surveyors', '2500+ Cashless Workshops'],
    img: "https://apimotor.bajajcapitalinsurance.com/uploads/logos/iffcoTokio.jpg",
  },
  {
    valueIDV: 67400,
    buyNow: 2746,
    basePrimium: 2416,
    compulsoryPersionalAccident: 330,
    features: ['Future Xpress claims process', 'In house surveyors', '2500+ Cashless Workshops'],
    img: "https://apimotor.bajajcapitalinsurance.com/uploads/logos/icici_lombard.jpg",
  }
];
