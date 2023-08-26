import React from 'react';
import Sidebar from '../../../components/Sidebar';
import Topbar from '../../../components/Topbar';
import girl from "../images/girl.png";


const LicHealthPlans = () => {
  return (
    <div className="container">
    <Sidebar open={false} />
    <div className="main">
      <Topbar />
      <div className="inner-container">
      <div className="w-full bg-blue-200 border border-gray-300 p-4 flex h-[50px] md:h-auto overflow-hidden">
      <div className="flex-1 text-center">
        <div className="mb-2 font-semibold">Sort By</div>
        <select
          className="border rounded-lg p-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
        >
          <option value="premiumLowToHigh">Premium Low to High</option>
          <option value="relevance">Relevance</option>
        </select>
        <div className="h-4 border-l border-gray-300"></div>
      </div>
      <div className="flex-1 text-center">
        <div className="mb-2 font-semibold">Premium</div>
        <select
          className="border rounded-lg p-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
        >
          <option value="lessThan5000">Less than ₹5000</option>
          <option value="5000To10000">₹5000 - ₹10000</option>
          <option value="10000To15000">₹10000 - ₹15000</option>
          <option value="15000To20000">₹15000 - ₹20000</option>
          <option value="moreThan20000">More than ₹20000</option>
        </select>
        <div className="h-4 border-l border-gray-300"></div>
      </div>
      <div className="flex-1 text-center">
        <div className="mb-2 font-semibold">Cover</div>
        <select
          className="border rounded-lg p-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
        >
          <option value="upto3Lakhs">Upto 3 Lakhs</option>
          <option value="moreThan3Lakhs">More than 3 Lakhs</option>
          <option value="upto5Lakhs">Upto 5 Lakhs</option>
          <option value="moreThan5Lakhs">More than 5 Lakhs</option>
          <option value="upto10Lakhs">Upto 10 Lakhs</option>
          <option value="moreThan10Lakhs">More than 10 Lakhs</option>
          <option value="upto15Lakhs">Upto 15 Lakhs</option>
          <option value="moreThan15Lakhs">More than 15 Lakhs</option>
          <option value="upto25Lakhs">Upto 25 Lakhs</option>
          <option value="moreThan25Lakhs">More than 25 Lakhs</option>
        </select>
        <div className="h-4 border-l border-gray-300"></div>
      </div>
      <div className="flex-1 text-center">
        <div className="mb-2 font-semibold">MultiYear Options</div>
        <select
          className="border rounded-lg p-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
        >
          <option value="1Year">1 Year</option>
          <option value="2Years">2 Years (Save Upto 10%)</option>
          <option value="3Years">3 Years (Save Upto 20%)</option>
        </select>
        <div className="h-4 border-l border-gray-300"></div>
      </div>
      <div className="flex-1 text-center">
        <div className="mb-2 font-semibold">Plan Type</div>
        <select
          className="border rounded-lg p-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
        >
          <option value="arogyaSanjeevani">Arogya Sanjeevani</option>
          <option value="globalPlans">Global Plans</option>
          <option value="baseHealth">Base Health</option>
          <option value="1CrorePlan">1 Crore Plan</option>
          <option value="topUpPlans">TopUp Plans</option>
        </select>
        <div className="h-4 border-l border-gray-300"></div>
      </div>
      <div className="flex-1 text-center">
        <div className="mb-2 font-semibold">Insures</div>
        <select
          className="border rounded-lg p-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
        >
          <option value="arogyaSanjeevani">Arogya Sanjeevani</option>
          <option value="globalPlans">Global Plans</option>
          <option value="baseHealth">Base Health</option>
          <option value="1CrorePlan">1 Crore Plan</option>
          <option value="topUpPlans">TopUp Plans</option>
        </select>
        <div className="h-4 border-l border-gray-300"></div>
      </div>
      <div className="flex-1 text-center">
        <div className="mb-2 font-semibold">More Filters</div>
        <select
          className="border rounded-lg p-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
        >
          <option value="">Select Options</option>

        </select>
      </div>
      
    {/* cards of insurance */}

    
    </div>

    <div className='grid grid-cols-2 gap-2'>
    <div className=" bg-white shadow-md rounded-lg p-4  items-center">
      <div className='flex justify-between'>
      <img className="w-10 h-10 mr-4" src={girl} alt="Company Logo" />
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-1">Insurance Company XYZ</h3>
        <p className="text-sm text-gray-500 mb-2">Cover: 5 Lakhs</p>
        <p className="text-base font-semibold">₹ per year</p>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        5393/Y
      </button>
      
      
      </div>
      <p className='text-blue-400 flex justify-end mr-2 mt-1'>Incl GST</p>
      <div>
      Room Rent Charges<span className='text-blue-400 ml-2'>All Categories</span> ||  No Claim Bonus <span className='text-blue-400 ml-2'>Upto 100%</span> <br></br>
      Cash Less Hospitals<span className='text-blue-400 ml-2'>748</span> ||  Pre-existing Disease  <span className='text-blue-400 ml-2'>3 Years</span> || Co-Payment <span>No</span>
    </div>
    <div className='flex'>
      <div>Short List</div>
      <div>See Details</div>
      <div>Compare</div>
    </div>
    </div>

    {/* 2 */}

    <div className=" bg-white shadow-md rounded-lg p-4  items-center">
      <div className='flex justify-between'>
      <img className="w-10 h-10 mr-4" src={girl} alt="Company Logo" />
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-1">Insurance Company XYZ</h3>
        <p className="text-sm text-gray-500 mb-2">Cover: 5 Lakhs</p>
        <p className="text-base font-semibold">₹ per year</p>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        5393/Y
      </button>
      
      
      </div>
      <p className='text-blue-400 flex justify-end mr-2 mt-1'>Incl GST</p>
      <div>
      Room Rent Charges<span className='text-blue-400 ml-2'>All Categories</span> ||  No Claim Bonus <span className='text-blue-400 ml-2'>Upto 100%</span> <br></br>
      Cash Less Hospitals<span className='text-blue-400 ml-2'>748</span> ||  Pre-existing Disease  <span className='text-blue-400 ml-2'>3 Years</span> || Co-Payment <span>No</span>
    </div>
    <div className='flex'>
      <div>Short List</div>
      <div>See Details</div>
      <div>Compare</div>
    </div>
    </div>

    {/* 3 */}

    <div className="bg-white shadow-md rounded-lg p-4  items-center">
      <div className='flex justify-between'>
      <img className="w-10 h-10 mr-4" src={girl} alt="Company Logo" />
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-1">Insurance Company XYZ</h3>
        <p className="text-sm text-gray-500 mb-2">Cover: 5 Lakhs</p>
        <p className="text-base font-semibold">₹ per year</p>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        5393/Y
      </button>
      
      
      </div>
      <p className='text-blue-400 flex justify-end mr-2 mt-1'>Incl GST</p>
      <div>
      Room Rent Charges<span className='text-blue-400 ml-2'>All Categories</span> ||  No Claim Bonus <span className='text-blue-400 ml-2'>Upto 100%</span> <br></br>
      Cash Less Hospitals<span className='text-blue-400 ml-2'>748</span> ||  Pre-existing Disease  <span className='text-blue-400 ml-2'>3 Years</span> || Co-Payment <span>No</span>
    </div>
    <div className='flex'>
      <div>Short List</div>
      <div>See Details</div>
      <div>Compare</div>
    </div>
    </div>

    {/* 4 */}

    <div className="bg-white shadow-md rounded-lg p-4  items-center">
      <div className='flex justify-between'>
      <img className="w-10 h-10 mr-4" src={girl} alt="Company Logo" />
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-1">Insurance Company XYZ</h3>
        <p className="text-sm text-gray-500 mb-2">Cover: 5 Lakhs</p>
        <p className="text-base font-semibold">₹ per year</p>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        5393/Y
      </button>
      
      
      </div>
      <p className='text-blue-400 flex justify-end mr-2 mt-1'>Incl GST</p>
      <div>
      Room Rent Charges<span className='text-blue-400 ml-2'>All Categories</span> ||  No Claim Bonus <span className='text-blue-400 ml-2'>Upto 100%</span> <br></br>
      Cash Less Hospitals<span className='text-blue-400 ml-2'>748</span> ||  Pre-existing Disease  <span className='text-blue-400 ml-2'>3 Years</span> || Co-Payment <span>No</span>
    </div>
    <div className='flex'>
      <div>Short List</div>
      <div>See Details</div>
      <div>Compare</div>
    </div>
    </div>
    
    </div>
    </div>
    </div>
    </div>
  );
};

export default LicHealthPlans;
