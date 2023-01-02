import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";
import useUsers from "../hooks/useUsers.js";

export default function Users() {
    const [search] = useSearchParams();
    const pageNo = search.get('page') || 0;
    const { users, loading, error, totalPages, currentPage } = useUsers(pageNo);

    useEffect(() => console.log(users), [loading]);

    return (
        <div className='container'>
           <Sidebar />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    <h6 className="text-secondary">Users</h6>
                    {
                        loading
                            ? (
                                <div className="flex jc-center ai-center">
                                    <span className="spinner medium"></span>
                                </div>
                            )
                            : (
                                <>
                                    <table className="users-table">
                                        <thead>
                                            <tr>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Email</th>
                                                <th>Mobile No.</th>
                                                <th>Pincode</th>
                                                <th>User Type</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                users.map(user => {
                                                    return (
                                                        <tr key={user.id}>
                                                            <td>{user.first_name}</td>
                                                            <td>{user.last_name}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.phone}</td>
                                                            <td>{user.pincode}</td>
                                                            <td>{user.userType}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <div className="pagination">
                                        {
                                            currentPage > 0
                                                ? (<Link className="text-bold" to={`?page=${currentPage - 1}`}>Prev</Link>)
                                                : (<span className="text-secondary text-bold">Prev</span>)
                                        }
                                        <span className="text-secondary">
                                            ({currentPage} / {totalPages})
                                        </span>
                                        {
                                            currentPage < totalPages
                                                ? (<Link className="text-bold" to={`?page=${currentPage + 1}`}>Next</Link>)
                                                : (<span className="text-secondary text-bold">Next</span>)
                                        }
                                    </div>
                                </>
                            )
                    }
                </div>
            </div>
        </div>
    )
}