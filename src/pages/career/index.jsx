import { useCallback } from "react";
import { useQuery } from "react-query";
import { Link, useSearchParams } from "react-router-dom";
import ViewIcon from "../../components/icons/ViewIcon.jsx";
import ErrorMessage from "../../components/messages/ErrorMessage.jsx";
import Pagination from "../../components/Pagination.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";
import { BASE_URL } from "../../constants.js";
import useAuth from "../../hooks/useAuth.js";
import { postDateFormatter } from "../../lib/formatter.js";
import AddCircleIcon from "../../components/icons/AddCircleIcon.jsx";

export default function Applications() {
    const { token } = useAuth();

    const [search] = useSearchParams();

    const page = parseInt(search.get('page')) || 0;

    const fetchApplications = useCallback(async () => {
        const res = await fetch(`${BASE_URL}/career/findAll?page=${page}`, {
            headers: new Headers({
                'Authorization': `Basic ${token}`,
            })
        });
    
        return res.json();
    }, [page]);    

    const { data, isLoading, error: fetchError } = useQuery(['applications', page], fetchApplications);

    return (
        <div className="container">
            <Sidebar />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    <div className="flex jc-between ai-center">
                        <h6 className="text-secondary">Applications</h6>
                        <div>
            <Link
              to="/career/create"
              className="button bg-blue-600 text-white is-small has-icon"
            >
              <AddCircleIcon />
              Create Career
            </Link>
                        </div>
                    </div>
                    {
                        isLoading
                            ? (
                                <div className="flex jc-center ai-center p-1rem">
                                    <span className="spinner small"></span>
                                </div>
                            )
                            : fetchError
                                ? <ErrorMessage message="Could not load applications" />
                                : (
                                    <>
                                    <div className="section p-0">
                                        <div className="scrollable">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Applied on</th>
                                                        <th>Email</th>
                                                        <th>Mobile</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        data.allCareer.map(application => (
                                                            <tr key={application.id}>
                                                                <td>
                                                                    <h6 className="title">{application.name}</h6>
                                                                </td>
                                                                <td>
                                                                    {
                                                                        postDateFormatter.format(new Date(application.createdAt))
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {application.email}
                                                                </td>
                                                                <td>
                                                                    {application.mobile}
                                                                </td>
                                                                <td>
                                                                    <Link to={`/career/application/${application.id}`} className="button has-icon reveal-button is-small w-max-content">
                                                                        <ViewIcon />
                                                                        Details
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        ))
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <Pagination totalPages={Math.ceil(data.total_application / 10)} currentPage={page} />
                                </>
                    )
                }
                </div>
            </div>
        </div>
    )
}