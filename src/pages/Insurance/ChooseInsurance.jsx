import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import Insurance_Type from "./ChooseData";
import { Link } from "react-router-dom";
import InsForm from "./InsForm";
import lic_logo from "./images/lic_logo.png"
import bajaj_capital from "./images/bajaj_capital.png"
import idfc from "./images/idfc.jpg"
import star_health from "./images/star_health.jpg"
import yes_bank from "./images/yes_bank.jpg"

function ChooseInsurance() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleCardClick = (nameData, event) => {
    event.preventDefault();
    setShowForm(true);
    setFormData((prevFormData) => ({ ...prevFormData, name: nameData }));
  };

  const handleGoBack = () => {
    setShowForm(false);
    setFormData({ name: "" }); // Reset formData when going back
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <>
      <div className="container">
        <Sidebar />
        <div className="main">
          <Topbar />
          {showForm ? (
            // Show the InsForm component when showForm is true
            <InsForm name={formData.name} handleGoBack={handleGoBack} />
          ) : (
            <section className="p-4">
              <div className="row mb-6">
                <h2 className="text-blue-900  text-lg">
                  Choose Your Insurance
                </h2>
              </div>
              {/* <div className="grid grid-cols-3 "> */}
              <div className="row grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div className="column">
                  
                    {/* Rest of the card content */}
                    <Link to="/insurance/lic/type">
                    <div className="card bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all border border-indigo-600 w-full h-full flex flex-col justify-between">
                      
                      <div className="icon-wrapper bg-blue-100 p-4 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <img
                          src={`${lic_logo}`}
                          alt="lic"
                          className="h-20 w-20 object-contain"
                        />
                      </div>
                      <div className="card-content flex flex-col items-center">
                        <h3 className="text-lg  mb-2 text-center">
                          {`LIC`}
                        </h3>
                        <p className="text-gray-600 text-center overflow-hidden">
                          {`Life Insurance Corporation of India is an Indian multinational public sector life insurance company.. `}
                        </p>
                      </div>
                     
                    </div>
                    </Link>
                    
                </div>

                <div className="column">
                 
                    {/* Rest of the card content */}
                    <Link to={'/insurance/bajajCapital'} className="card bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all border border-indigo-600 w-full h-full flex flex-col justify-between cursor-pointer">
                      <div className="icon-wrapper bg-blue-100 p-4 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <img
                          src={`${bajaj_capital}`}
                          alt=""
                          className="h-20 w-20 object-contain"
                        />
                      </div>
                      <div className="card-content flex flex-col items-center">
                        <h3 className="text-lg  mb-2 text-center">
                          {`Bajaj Capital`}
                        </h3>
                        <p className="text-gray-600 text-center overflow-hidden">
                          {`Bajaj Capital with over 59 years of experience is your one-stop solution for Mutual Funds...`}
                        </p>
                      </div>
                    </Link>
                </div>
                
                <div className="column">
                 
                    {/* Rest of the card content */}
                    <div className="card bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all border border-indigo-600 w-full h-full flex flex-col justify-between">
                      <div className="icon-wrapper bg-blue-100 p-4 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <img
                          src={`${idfc}`}
                          alt=""
                          className="h-20 w-20 object-contain"
                        />
                      </div>
                      <div className="card-content flex flex-col items-center">
                        <h3 className="text-lg  mb-2 text-center">
                          {`IDFC First Bank`}
                        </h3>
                        <p className="text-gray-600 text-center overflow-hidden">
                          {`At IDFC FIRST Bank we provide comprehensive banking services tailored to your needs... `}
                        </p>
                      </div>
                    </div>
                </div>

                <div className="column">
                
                    {/* Rest of the card content */}
                    <div className="card bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all border border-indigo-600 w-full h-full flex flex-col justify-between">
                      <div className="icon-wrapper bg-blue-100 p-4 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <img
                          src={`${star_health}`}
                          alt=""
                          className="h-20 w-20 object-contain"
                        />
                      </div>
                      <div className="card-content flex flex-col items-center">
                        <h3 className="text-lg  mb-2 text-center">
                          {`Star Health`}
                        </h3>
                        <p className="text-gray-600 text-center overflow-hidden">
                          {`Star Health Insurance offers flexible insurance policies for securing you and your loved ones...`}
                        </p>
                      </div>
                    </div>
                </div>

                <div className="column">
                 
                    {/* Rest of the card content */}
                    <div className="card bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all border border-indigo-600 w-full h-full flex flex-col justify-between">
                      <div className="icon-wrapper bg-blue-100 p-4 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <img
                          src={`${yes_bank}`}
                          alt=""
                          className="h-20 w-20 object-contain"
                        />
                      </div>
                      <div className="card-content flex flex-col items-center">
                        <h3 className="text-lg  mb-2 text-center">
                          {`Yes Bank`}
                        </h3>
                        <p className="text-gray-600 text-center overflow-hidden">
                          {`We at YES Bank offer you net banking, personal banking & other banking solutions like loans...`}
                        </p>
                      </div>
                    </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

export default ChooseInsurance;
