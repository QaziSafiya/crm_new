import { useMemo } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import CloseCircleIcon from "../../components/icons/CloseCircleIcon.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";
import useUser from "../../hooks/useUser.js";

export default function UserLayout() {
    const { id } = useParams();
    const { user, loading, error } = useUser(id);

    return (
        <div className="container">
            <Sidebar />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    {
                        loading
                            ? (
                                <div className="flex jc-center ai-center h-100pc">
                                    <span className="spinner small"></span>
                                </div>
                            )
                            : error
                                ? (
                                    <div className="error-message">
                                        <CloseCircleIcon />
                                        {error}
                                    </div>
                                )
                                : (
                                    <>
                                        <h6 className="text-secondary">{user?.fullName}</h6>
                                        <div className="section g-2rem">
                                            <div className="tabs">
                                                <NavLink end to={`/user/${id}`} className="tab" replace>Personal Details</NavLink> 
                                                <NavLink end to={`company`} className="tab" replace>Company Details</NavLink>
                                                <NavLink end to={`bank`} className="tab" replace>Bank Details</NavLink> 
                                            </div>
                                            <div className="scrollable">
                                                <Outlet />
                                            </div>
                                        </div>
                                    </>
                                )
                    }
                </div>
            </div>
        </div>
    )
}