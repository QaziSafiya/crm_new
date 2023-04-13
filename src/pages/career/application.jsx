import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import DetailField from "../../components/DetailField.jsx";
import ViewIcon from "../../components/icons/ViewIcon.jsx";
import ErrorMessage from "../../components/messages/ErrorMessage.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";
import { BASE_URL } from "../../constants.js";
import useAuth from "../../hooks/useAuth.js";
import { postDateFormatter } from "../../lib/formatter.js";

export default function JobApplicationDetails() {
    const { token } = useAuth();

    const { id } = useParams();

    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchApplication = async() => {
        try {
            setLoading(true);

            const res = await fetch(`${BASE_URL}/career/application/${id}`, {
                headers: new Headers({
                    'Authorization': `Basic ${token}`,
                }),
            });

            if(!res.ok) {
                throw new Error('Could not fetch application.');
            }

            const application = await res.json();

            setApplication(application);
        } catch(e) {
            console.error(e);
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplication();
    }, []);

    return (
        <div className="container">
            <Sidebar />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    <h6 className="text-secondary">Application Details</h6>
                    {
                        loading
                            ? (
                                <div className="flex jc-center ai-center p-1rem">
                                    <span className="spinner small"></span>
                                </div>
                            )
                            : error
                                ? <ErrorMessage message={error} />
                                : (
                                    <div className="section">
                                        <div className="scrollable">
                                            <DetailField label="Name" value={application.name} />
                                            <DetailField label="Email" value={application.email} type="email" />
                                            <DetailField label="Mobile" value={application.mobile} type="phone" />
                                            <DetailField label="Address" value={application.address} />
                                            <DetailField label="Applied on" value={postDateFormatter.format(new Date(application.createdAt))} />
                                            <DetailField label="Last Update" value={postDateFormatter.format(new Date(application.updatedAt))} />
                                            <DetailField label="Skills" value={application.skills} />
                                            <DetailField label="Gender" value={application.gender} />
                                            <div className="flex g-1rem ai-center">
                                                <span className="label text-primary">
                                                    CV
                                                </span>
                                                <a href={application.cv} target="_blank" className="button has-icon reveal-button is-small w-max-content">
                                                    <ViewIcon />
                                                    View
                                                </a>
                                            </div>
                                        </div>
                                    </div> 
                                )
                    }
                </div>
            </div>
        </div>
    );
}