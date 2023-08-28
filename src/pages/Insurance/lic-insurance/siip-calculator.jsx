import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import JeevanUmangPremiumCalculator from "./premium-calculator";

const SIIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(0);
  const [investmentDuration, setInvestmentDuration] = useState(0);
  const [expectedReturnRate, setExpectedReturnRate] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalReturns, setTotalReturns] = useState(0);

  const formatAmount = (amount) => {
    if (amount >= 10000000) {
      // Convert to crores
      return `₹${(amount / 10000000).toFixed(2)} Crores`;
    } else if (amount >= 100000) {
      // Convert to lakhs
      return `₹${(amount / 100000).toFixed(2)} Lakhs`;
    } else {
      return `₹${amount}`;
    }
  };

  const calculateInvestment = () => {
    const investment = monthlyInvestment * 12 * investmentDuration;
    setTotalInvestment(investment.toFixed(2));
  };

  const calculateReturns = () => {
    const returns = totalInvestment * Math.pow(1 + expectedReturnRate / 100, investmentDuration);
    setTotalReturns(returns.toFixed(2));
  };

  const calculateTotalAmount = () => {
  const monthlyRate = expectedReturnRate / 100 / 12; // Convert annual rate to monthly rate
  const totalMonths = investmentDuration * 12;
  
  const futureValue =
   monthlyInvestment *
    ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
    (1 + monthlyRate);
  
  return `${futureValue.toFixed(2)}`;
};


  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex-1 p-8">
        <Topbar />
        <div className="inner-container">
    <div className="flex justify-center items-center mt-10 ">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">SIIP Calculator</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Monthly Investment Amount
          </label>
          <input
            type="number"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
            value={monthlyInvestment}
            onChange={(e) => setMonthlyInvestment(e.target.value)}
            placeholder="Enter monthly investment amount"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Investment Duration (Years)
          </label>
          <input
            type="number"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
            value={investmentDuration}
            onChange={(e) => setInvestmentDuration(e.target.value)}
            placeholder="Enter investment duration"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expected Return Rate (%)
          </label>
          <input
            type="number"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
            value={expectedReturnRate}
            onChange={(e) => setExpectedReturnRate(e.target.value)}
            placeholder="Enter expected return rate"
            required
          />
        </div>
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={() => {
            calculateInvestment();
            calculateReturns();
          }}
        >
          Calculate
        </button>
        <div className="mt-4">
        <div className="mt-4">
  <p>Total Invested Amount: {formatAmount(totalInvestment)}</p>
  <p>Total Amount at End of {investmentDuration} Years: {isNaN(calculateTotalAmount()) ? formatAmount(0) : formatAmount(parseFloat(calculateTotalAmount()))}</p>
</div>

        </div>
      </div>
    </div>
   
    </div>
    </div>
    </div>
  );
};

export default SIIPCalculator;
