// InsuranceCard.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Insurance_Type from "./ChooseData";
import InsForm from "./InsForm";

const InsuranceCard = () => {
  const [formData, setFormData] = useState(null);

  const handleCardClick = (name) => {
    setFormData(name);
  };

  useEffect(() => {
    // The following line will log the updated formData
    console.log(formData);
  }, [formData]);
  console.log(formData);
  return (
    <>
      <section className="p-4">
        <div className="row mb-6">
          <h2 className="section-heading text-3xl font-bold text-center w-full">
            Choose Your Insurance
          </h2>
        </div>
        {formData && <InsForm formData={formData} />}
        <div className="row grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Insurance_Type.map((curElem) => (
            <div className="column" key={curElem.id}>
              <Link to={"/insurance/form"}>
                <div
                  className="card bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all border border-indigo-600 w-full h-full flex flex-col justify-between"
                  onClick={() => handleCardClick(curElem.name)}
                >
                  <div className="icon-wrapper bg-blue-100 p-4 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <img
                      src={curElem.image}
                      alt=""
                      className="h-20 w-20 object-contain"
                    />
                  </div>
                  <div className="card-content flex flex-col items-center">
                    <h3 className="text-xl font-semibold mb-2 text-center">
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
    </>
  );
};

export default InsuranceCard;
