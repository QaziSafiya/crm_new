import React, { useState } from "react";
import Sidebar from "../../../../components/Sidebar";
import Topbar from "../../../../components/Topbar";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const BajajHealthBasicDetail = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        gender: 'male', // Default gender
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.mobile) newErrors.mobile = 'Mobile is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // You can perform further actions here, such as sending data to a server
            console.log('Form submitted:', formData);
            navigate('/insurance/bajajCapital/healthInsurance_ageCaptureForm');
        }
    };

    return (
        <div className="container">
            <Sidebar />
            <div className="flex flex-col p-4 w-full">
                <Topbar />
                <div className="max-w-md mx-auto p-6 border rounded shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-blue-400">Health Insurance Application</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block font-semibold text-blue-400">Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                            />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold text-blue-400">Mobile:</label>
                            <input
                                type="text"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                            />
                            {errors.mobile && <span className="text-red-500 text-sm">{errors.mobile}</span>}
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold text-blue-400">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold text-blue-400">Gender:</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.gender && <span className="text-red-500 text-sm">{errors.gender}</span>}
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Get Started
                        </button>
                    </form>
                </div>
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