import React, { useState } from 'react';
import Sidebar from "../../../../components/Sidebar";
import Topbar from "../../../../components/Topbar";
import { useNavigate } from 'react-router-dom';

const AgeCaptureForm = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([
        { id: 1, relationship: '', age: '' },
    ]);
    const [relationshipOptions, setRelationshipOptions] = useState(['Self', 'Spouse', 'Son', 'Daughter', 'Father', 'Mother']);

    const handleAddUser = () => {
        const newUser = { id: users.length + 1, relationship: '', age: '' };
        setUsers([...users, newUser]);
    };

    const handleUserChange = (index, field, value) => {
        const updatedUsers = [...users];
        updatedUsers[index][field] = value;
        setUsers(updatedUsers);

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Users:', users);
        // You can perform further actions here, such as sending data to a server
        navigate('/insurance/bajajCapital/carInsurance')
    };


    return (
        <div className="container">
            <Sidebar />
            <div className="flex flex-col p-4 w-full">
                <Topbar />
                <div className="max-w-md mx-auto p-6 border rounded shadow-md mt-10">
                    <h2 className="text-xl font-semibold mb-4">Age Capture Form</h2>
                    <form onSubmit={handleSubmit}>
                        {users.map((user, index) => (
                            <div key={user.id} className="mb-4">
                                <label className="block font-semibold">User {index + 1}:</label>
                                <select
                                    className="w-full px-3 py-2 border rounded"
                                    value={user.relationship}
                                    onChange={(e) => handleUserChange(index, 'relationship', e.target.value)}
                                >
                                    <option value="">Select Relationship</option>
                                    {relationshipOptions.map((option) => (
                                        <option key={option} value={option.toLowerCase()}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="number"
                                    className="w-full mt-2 px-3 py-2 border rounded"
                                    placeholder="Enter Age"
                                    value={user.age}
                                    onChange={(e) => handleUserChange(index, 'age', e.target.value)}
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            onClick={handleAddUser}
                        >
                            Add User
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 text-white py-2 px-4 rounded ml-2 hover:bg-green-600"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AgeCaptureForm;

