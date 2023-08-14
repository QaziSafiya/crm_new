import React, { useState } from 'react';
import axios from 'axios';

const NewOrderForm = () => {
    const BASE_URL = 'YOUR_API_BASE_URL'; // Replace with your actual API base URL
    const [formData, setFormData] = useState({
        services: ['378538a1-d4c2-41ec-9e4f-2b9a5b90a8bc'],
        status: 'pending',
        price: 100,
        gst: 18,
        orderTotal: 118,
        stateOfSupply: 'Uttar Pradesh',
        payments: []
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${BASE_URL}/orders`, formData);

            if (response.status === 201) {
                console.log('Order created successfully:', response.data);
                // Reset the form fields
                setFormData({
                    services: ['378538a1-d4c2-41ec-9e4f-2b9a5b90a8bc'],
                    status: 'pending',
                    price: 100,
                    gst: 18,
                    orderTotal: 118,
                    stateOfSupply: 'Uttar Pradesh',
                    payments: []
                });
            }
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-4">Create New Order</h1>
            <form onSubmit={handleSubmit} className="max-w-sm">
                <div className="mb-4">
                    <label htmlFor="services" className="block font-semibold mb-2">
                        Services
                    </label>
                    <select
                        name="services"
                        multiple
                        value={formData.services}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1 rounded-lg border-gray-300 border focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        required
                    >
                        <option value="378538a1-d4c2-41ec-9e4f-2b9a5b90a8bc">Service 1</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                {/* Add more form fields here */}
                <div className="mt-6">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
                    >
                        Create Order
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewOrderForm;
