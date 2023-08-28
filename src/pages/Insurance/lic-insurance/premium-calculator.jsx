import React, { useState } from "react";

const JeevanUmangPremiumCalculator = () => {
  const [age, setAge] = useState(0);
  const [sumAssured, setSumAssured] = useState(200000);
  const [ppt, setPPT] = useState(15);
  const [premiumPaymentMode, setPremiumPaymentMode] = useState("Yearly");
  const [premiumAmount, setPremiumAmount] = useState(0);

  const calculatePremium = () => {
    // Your premium calculation logic here
    
    // For the sake of the example, let's calculate a simple premium
    const modeRebate = premiumPaymentMode === "Yearly" ? 0.02 : 0.01;
    const sumAssuredRebate = getSumAssuredRebate(sumAssured);
    
    const premium =
      (sumAssured * (1 - sumAssuredRebate) +
        age +
        ppt * modeRebate) *
      ppt;
    
    setPremiumAmount(premium.toFixed(2));
  };

  const getSumAssuredRebate = (sa) => {
    if (sa >= 500000 && sa <= 975000) {
      return 0.0125;
    } else if (sa >= 1000000 && sa <= 2475000) {
      return 0.0175;
    } else if (sa >= 2500000) {
      return 0.02;
    }
    return 0;
  };

  return (
    <div className="calculator-container">
      <h2 className="calculator-heading">Jeevan Umang Premium Calculator</h2>
      <div className="input-field">
        <label>Your Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(parseInt(e.target.value))}
        />
      </div>
      <div className="input-field">
        <label>Basic Sum Assured (₹):</label>
        <input
          type="number"
          value={sumAssured}
          onChange={(e) => setSumAssured(parseInt(e.target.value))}
        />
      </div>
      <div className="input-field">
        <label>Premium Paying Term (PPT):</label>
        <select
          value={ppt}
          onChange={(e) => setPPT(parseInt(e.target.value))}
        >
          <option value={15}>15 Years</option>
          <option value={20}>20 Years</option>
          <option value={25}>25 Years</option>
          <option value={30}>30 Years</option>
        </select>
      </div>
      <div className="input-field">
        <label>Premium Payment Mode:</label>
        <select
          value={premiumPaymentMode}
          onChange={(e) => setPremiumPaymentMode(e.target.value)}
        >
          <option value="Yearly">Yearly</option>
          <option value="Half Yearly">Half Yearly</option>
          <option value="Quarterly">Quarterly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>
      <button className="calculate-button" onClick={calculatePremium}>
        Calculate Premium
      </button>
      <div className="result">
        <p className="premium-amount">Premium Amount:</p>
        <p className="premium-value">₹ {premiumAmount}</p>
      </div>
    </div>
  );
};

export default JeevanUmangPremiumCalculator;
