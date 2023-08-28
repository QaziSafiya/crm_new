import React from "react";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const BajajBasicDetails = () => {
  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    localStorage.setItem("bajajInsDetails", JSON.stringify(data));
    navigate('/insurance/bajajCapital/vehicleDetails');
  };
  return (
    <div className="container">
      <Sidebar />
      <div className="flex flex-col p-4 w-full">
        <Topbar />
        <section>
          <form
            className="flex flex-col w-10/12 m-auto gap-1"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col items-center m-10">
              <p className="text-3xl text-blue-500">
                Now Buy fastest Car Insurance online in
              </p>
              <p className="text-3xl text-blue-500">Inida.</p>
            </div>
            <Controller
              name="fullName"
              control={control}
              defaultValue=""
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  className="text-lg border border border-gray-400 outline-pink-600 py-2 px-5 rounded-full"
                  placeholder="Full Name"
                />
              )}
            />
            {errors.fullName && (
              <p className="text-red-500 pl-7">{errors.fullName.message}</p>
            )}
            <br />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  className="text-lg border border border-gray-400 outline-pink-600 py-2 px-5 rounded-full"
                  placeholder="Email"
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 pl-7">{errors.email.message}</p>
            )}
            <br />
            <Controller
              name="mobile"
              control={control}
              defaultValue=""
              rules={{ required: "mobile No. is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  className="text-lg border border border-gray-400 outline-pink-600 py-2 px-5 rounded-full"
                  placeholder="Mobile"
                />
              )}
            />
            {errors.mobile && (
              <p className="text-red-500 pl-7">{errors.mobile.message}</p>
            )}
            <br />
            <button
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'gray';
                e.target.style.color = 'black';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'darkgray';
                e.target.style.color = 'black';
              }}
              type="submit"
              className="m-auto border text-black py-2 px-5 rounded-full text-lg"
            >
              Proceed &nbsp;&rarr;
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default BajajBasicDetails;
