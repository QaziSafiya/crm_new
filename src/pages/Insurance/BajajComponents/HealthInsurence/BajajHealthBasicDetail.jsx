import React, { useState } from "react";
import Sidebar from "../../../../components/Sidebar";
import Topbar from "../../../../components/Topbar";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const BajajHealthBasicDetail = () => {
    const [toggleGender, setToggleGender] = useState('Yes');

    const navigate = useNavigate()
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("data :", data);
        // localStorage.setItem("bajajHealthInsDetails", JSON.stringify(data));
        // navigate('/insurance/bajajCapital/vehicleDetails');
    };

    const handleGenderToggle = (option) => {
        setToggleGender(option);
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
                                Tell us about yourself
                            </p>
                        </div>
                        <div className="flex border justify-center space-x-2">
                            <button
                                onClick={() => handleGenderToggle('Male')}
                                className={`py-2 px-10 rounded border border-red-500 ${toggleGender === 'Male'
                                    ? 'bg-red-500 text-white'
                                    : 'bg-white text-red-500'
                                    }`}
                            >
                                Male
                            </button>
                            <button
                                onClick={() => handleGenderToggle('Femail')}
                                className={`py-2 px-10 rounded border border-red-500 ${toggleGender === 'Femail'
                                    ? 'bg-red-500 text-white'
                                    : 'bg-white text-red-500'
                                    }`}
                            >
                                Femail
                            </button>
                        </div>

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


export default BajajHealthBasicDetail




//     < Controller
// name = "fullName"
// control = { control }
// defaultValue = ""
// rules = {{ required: "Name is required" }}
// render = {({ field }) => (
//     <input
//         {...field}
//         className="text-lg border border border-gray-400 outline-pink-600 py-2 px-5 rounded-full"
//         placeholder="Full Name"
//     />
// )}
// />
// {
//     errors.fullName && (
//         <p className="text-red-500 pl-7">{errors.fullName.message}</p>
//     )
// }