import React from "react";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const BajajVehicleDetails = () => {
  const navigate = useNavigate();
  const insurenceDetails = JSON.parse(localStorage.getItem("bajajInsDetails")) || {};
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const updatedDetails = {
      ...insurenceDetails,
      vehicleNumber: data.vehicleNumber,
    };
    localStorage.setItem('bajajInsDetails', JSON.stringify(updatedDetails));
    navigate('/insurance/bajajCapital/carInsurance')
  };
  return (
    <div className="container">
      <Sidebar />
      <div className="flex flex-col p-4 w-9/12">
        <Topbar />
        <section>
          <div className="md:flex flex-col justify-center items-center my-10 p-2">
            <p className="text-3xl text-blue-500">
              Let's begin with your vehicle registration{" "}
              <span className="lg:flex justify-center">number.</span>
            </p>
          </div>
          <form
            className="flex justify-center items-start gap-2 flex-wrap"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="md:w-8/12 lg:w-9/12">
              <Controller
                name="vehicleNumber"
                control={control}
                defaultValue=""
                rules={{ required: "Vehicle Number is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full text-lg border border-gray-400 outline-pink-600 py-2 px-5 rounded"
                    placeholder="Enter Registration No.{MH-04-AR-7070}"
                  />
                )}
              />
              {errors.vehicleNumber && (
                <p className="text-red-500 pl-2">
                  {errors.vehicleNumber.message}
                </p>
              )}
            </div>
            <button
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "gray";
                e.target.style.color = "black";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "darkgray";
                e.target.style.color = "black";
              }}
              type="submit"
              className="border text-black py-2 px-5 rounded text-lg"
            >
              Proceed &nbsp;&rarr;
            </button>
          </form>
          <div className="flex justify-center items-center font-semibold m-9 m-auto">
            <h1>OR</h1>
          </div>
          <div className="flex justify-center gap-2 ">
            <button className="sm:text-sm border py-2 px-5 bg-red-500 text-white font-normal rounded">
              Proceed without Vehicle Number
            </button>
            <button className="sm:text-sm border py-2 px-5 bg-red-500 text-white font-normal rounded">
              Got a New Vehicle? Click Here
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BajajVehicleDetails;
