import { useEffect } from "react";
import useUser from "../../hooks/useUser.js";
import DetailField from "../../components/DetailField.jsx";

export default function CustomerPersonalInfo() {
    const { user, loading } = useUser();

    if(loading) {
        return (
            <div className="flex jc-center ai-center">
                <span className="spinner small"></span>
            </div>
        )
    }

    return (
        <div className="flex dir-col g-1rem">
            <DetailField label="Name" value={user.fullName} />
            <DetailField label="DOB" value={user.dob} />
            <DetailField label="Email" value={user.email} type="email" />
            <DetailField label="Mobile no" value={user.phone} type="phone" />
            <DetailField label="Marriage Anniversary" value="10/10/12" />
            <DetailField label="Pan no." value={user.pan} />
            <DetailField label="Aadhaar" value={user.aadhar} />
            <DetailField label="Address" value="Kol baz bahadur Azamgarh" />
        </div>
    )
}