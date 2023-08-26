import React from 'react'
import Topbar from '../../../components/Topbar'
import Sidebar from '../../../components/Sidebar'
import car from "../images/car.png"
import bike from "../images/bike.png"
import health from "../images/health.png"
import { Link } from 'react-router-dom'




const LicInsuranceType = () => {
  return (
    <div className="container">
    <Sidebar />
    <div className="main">
      <Topbar />
      <div className="inner-container">

    <div className='flex'>
    <div className="flex flex-col items-center w-40 h-40 bg-gray-200 rounded-lg shadow-md p-4 m-4">
      <Link to={"/insurance/lic/car/info"}>
    <div className="w-24 h-24 rounded-full overflow-hidden">
      <img src={car} alt={"car"} className="w-full h-full object-cover object-center" />
    </div>
    <p className="flex justify-center mt-2 text-lg font-semibold">Car</p>
    </Link>
  </div>

  <div className="flex flex-col items-center w-40 h-40 bg-gray-200 rounded-lg shadow-md p-4 m-4">
    <Link to={"/insurance/lic/info"}>
    <div className="w-24 h-24 rounded-full overflow-hidden">
      <img src={bike} alt={"bike"} className="w-full h-full object-cover object-center" />
    </div>
    <p className="flex justify-center mt-2 text-lg font-semibold">Bike</p>
    </Link>
  </div>

  <div className="flex flex-col items-center w-40 h-40 bg-gray-200 rounded-lg shadow-md p-4 m-4">
    <Link to={"/insurance/lic/personal-details"} >
    <div className="w-24 h-24 rounded-full overflow-hidden">
      <img src={health} alt={"health"} className="w-full h-full object-cover object-center" />
    </div>
    <p className="flex justify-center mt-2 text-lg font-semibold">Health</p>
    </Link>
  </div>
    </div>
    </div>
    </div>
    </div>

  )
}

export default LicInsuranceType