import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CloseCircleIcon from "../components/icons/CloseCircleIcon.jsx";
import ViewIcon from "../components/icons/ViewIcon.jsx";
import Pagination from "../components/Pagination.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";
import useUsers from "../hooks/useUsers.js";

export default function Users() {
    const [search, setSearch] = useSearchParams();
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
                            : 
                                error 
                                    ? (
                                        <div className="error-message">
                                            <CloseCircleIcon />
                                            {error}
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
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        users.map(user => {
                                                            return (
                                                                <tr key={user.id}>
                                                                    <td>{user.firstName}</td>
                                                                    <td>{user.lastName}</td>
                                                                    <td>{user.email}</td>
                                                                    <td>{user.phone}</td>
                                                                    <td>{user.pincode}</td>
                                                                    <td>{user.userType}</td>
                                                                    <td>
                                                                        <Link to={`/user/${user.id}`} className="button has-icon reveal-button is-small">
                                                                            <ViewIcon />
                                                                            Details
                                                                        </Link>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                            <Pagination 
                                                totalPages={totalPages} 
                                                currentPage={currentPage} 
                                                setSearch={setSearch} 
                                            />
                                        </>
                                    )
                    }
                </div>
            </div>
        </div>
    )
}