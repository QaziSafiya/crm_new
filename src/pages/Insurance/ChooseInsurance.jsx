import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import Insurance_Type from "./ChooseData";
import { Link } from "react-router-dom";
import InsForm from "./InsForm";

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
            <InsForm name={formData.name} handleGoBack={handleGoBack}/>
          ) : (
            <section className="p-4">
              <div className="row mb-6">
                <h2 className="text-blue-900  text-lg">
                  Choose Your Insurance
                </h2>
              </div>
              <div className="row grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Insurance_Type.map((curElem) => (
                  <div className="column" key={curElem.id}>
                    <Link to={"/insurance/form"} onClick={(e) =>
                          handleCardClick(JSON.stringify(curElem.name), e)
                        }>
                      {/* Rest of the card content */}
                      <div
                        className="card bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all border border-indigo-600 w-full h-full flex flex-col justify-between"
                        
                      >
                        <div className="icon-wrapper bg-blue-100 p-4 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <img
                            src={curElem.image}
                            alt=""
                            className="h-20 w-20 object-contain"
                          />
                        </div>
                        <div className="card-content flex flex-col items-center">
                          <h3 className="text-lg  mb-2 text-center">
                            {curElem.name}
                          </h3>
                          <p className="text-gray-600 text-center overflow-hidden">
                            {curElem.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

export default ChooseInsurance;
