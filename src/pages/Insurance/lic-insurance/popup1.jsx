import React from "react";
import { Link } from "react-router-dom";

const PlanPopup = ({ onClose }) => {
  return (
    <div className="popup-container">
      {/* Popup content goes here */}
      
      <div>
      <h2 className="text-xl text-black mb-2">Product Benefits</h2>

    <div className="mb-3">
  <p className="text-sm text-blue-400">- Low Cost</p>
  <p>No charges for Policy Administration</p>
  </div>

  <div className="mb-3">
  <p className="text-sm text-blue-400">- Zero Commission</p>
  <p>We charge no commission when you buy from us</p>
  </div>

  <div className="mb-3">
  <p className="text-sm text-blue-400">- Return of Mortality Charges</p>
  <p>The amount equal to the mortality charges deducted in the policy will be added back to the fund value at maturity, provided all due premiums have been received.</p>
  </div>

  <div className="mb-3"> 
  <p className="text-sm text-blue-400 ">- Inbuilt Life Cover</p>
  <p>Inbuilt life Cover of ₹12 Lac throughout the policy term.</p>
  </div>

  <div className="mb-3">
  <p className="text-sm text-blue-400">- Partial Withdrawals</p>
  <p>You can withdraw any amount anytime after 5 years. Multiple withdrawals are allowed</p>
  </div>

  <div className="flex gap-4">

  <div className="w-1/2 mb-3">
  <p className="text-sm text-blue-400 mb-3">Investment Criteria</p>
  <div className=" p-4 flex flex-col justify-between border-2 rounded-md">

<p className="text-blue-400">Age to start Investing</p>
  <div className="flex">
  <div className="w-1/2">
    <p>Minimum:</p>
  </div>
  <div className="w-1/2">
    <p>18 Yrs</p>
  </div>
</div>
<div className="flex">

  <div className="w-1/2">
    <p>Maximum:</p>
  </div>
  <div className="w-1/2">
    <p>50 yrs</p>
  </div>
</div>


<p className="text-blue-400">Number of years after which your investment will mature</p>
<div className="flex">
  <div className="w-1/2">
    <p>Minimum:</p>
  </div>
  <div className="w-1/2">
    <p>10 Yrs</p>
  </div>
</div>

<div className="flex">
  <div className="w-1/2">
    <p>Maximum:</p>
  </div>
  <div className="w-1/2">
    <p>25 Yrs</p>
  </div>
</div>

</div>

{/* Repeat similar structure for the remaining rows */}

  </div>

  <div className="w-1/2 mb-3 mt-14">
 
  <div className=" p-4 flex flex-col justify-between border-2 rounded-md">

<p className="text-blue-400">Minimum amount to invest</p>

  <div className="flex">
  <div className="w-1/2">
    <p>Monthly:</p>
  </div>
  <div className="w-1/2">
    <p>₹4000</p>
  </div>
</div>

<div className="flex">

  <div className="w-1/2">
    <p>Quarterly:</p>
  </div>
  <div className="w-1/2">
    <p>₹12000</p>
  </div>
</div>



<div className="flex">
  <div className="w-1/2">
    <p>Half Yearly:</p>
  </div>
  <div className="w-1/2">
    <p>₹22000</p>
  </div>
</div>

<div className="flex">
  <div className="w-1/2">
    <p>Yearly:</p>
  </div>
  <div className="w-1/2">
    <p>₹40000</p>
  </div>
</div>


</div>

{/* Repeat similar structure for the remaining rows */}

  </div>
  </div>



      </div>
      {/* ... Other content ... */}
      <button className="close-button bg-gray-400" onClick={onClose}>
        Close
      </button>
      <Link to="/insurance/payment-gateway">
      <button className="close-button bg-blue-400 ml-2">
        Proceed
      </button>
      </Link>
    </div>
  );
};

export default PlanPopup;
