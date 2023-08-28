import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const BajajPrevPolicyExpDate = ({ closeModal }) => {
  const navigate = useNavigate();
  const insurenceDetails = JSON.parse(localStorage.getItem("bajajInsDetails")) || {};
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data) {
      if (data.startDate > data.endDate) {
        toast.error("Start date cannot be greater than end date.");
      } else {
        const updatedDetails = {
          ...insurenceDetails,
          startDate: data.startDate,
          endDate: data.endDate,
        };
        localStorage.setItem('bajajInsDetails', JSON.stringify(updatedDetails));
      }
    }

    localStorage.setItem('ExpDateCaptured', JSON.stringify(true));
    closeModal(false);
  };

  const handleUnknownPolicy = () => {
    localStorage.setItem('ExpDateCaptured', JSON.stringify(true));
    closeModal(false);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-10 bg-opacity-50 bg-gray-800">
      <ToastContainer />
      <div className="bg-white p-5 rounded">
        <h1 className="text-red-500 text-center text-xl">
          Quotes are just a step away.
        </h1>
        <div className="flex flex-col items-center justify-center text-black mt-5">
          <h1>Select Previous policy Expiration date</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="sm:flex mt-10 gap-5">
              <div className="mb-4">
                <label htmlFor="startDate">From:</label>
                <Controller
                  name="startDate"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Start date is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="date"
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      style={{ borderRadius: "0.25rem", lineHeight: "1.25" }}
                    />
                  )}
                />
                {errors.startDate && (
                  <p className="text-red-500 pl-2">
                    {errors.startDate.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="endDate">To:</label>
                <Controller
                  name="endDate"
                  control={control}
                  defaultValue=""
                  rules={{ required: "End date is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="date"
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      style={{ borderRadius: "0.25rem", lineHeight: "1.25" }}
                    />
                  )}
                />
                {errors.endDate && (
                  <p className="text-red-500 pl-2">{errors.endDate.message}</p>
                )}
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </form>
          <div className="p-5">
            <button className="underline text-red-500" onClick={handleUnknownPolicy}>
              I Don't know the previous policy details.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BajajPrevPolicyExpDate;
