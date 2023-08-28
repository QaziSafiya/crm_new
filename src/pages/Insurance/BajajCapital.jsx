import React from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { Link } from "react-router-dom";

const BajajCapital = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="flex flex-col p-4 w-full">
        <Topbar />
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 p-4 mt-10 rounded-md">
          {[
            {
              icon: "m_home_car.png",
              title: "Car",
              path: "/insurance/bajajCapital/basicDetails",
            },
            { icon: "m_home_bike.png", title: "Bike", path: "/insurance/bajajCapital/basicDetails" },
            {
              icon: "m_home_mediclaim.png",
              title: "Health",
              path: "/insurance/bajajCapital/healthInsurance/basic_details",
            },
          ].map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className="py-5 border gap-5 flex flex-col justify-center items-center border rounded-lg bg-white cursor-pointer"
            >
              <img
                src={`https://dashboard.bajajcapitalinsurance.com/public/images/mobile/${item.icon}`}
                alt={item.title}
              />
              <p className="text-xl font-semibold">{item.title}</p>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
};


export default BajajCapital;