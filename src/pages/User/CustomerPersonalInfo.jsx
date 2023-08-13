import { useEffect } from "react";
import useUser from "../../hooks/useUser.js";
import DetailField from "../../components/DetailField.jsx";
import { postDateFormatter } from "../../lib/formatter.js";

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
            <DetailField label="Email" value={user.email} type="email" />
            <DetailField label="Mobile no" value={user.phone} type="phone" />
            {user.userType? <DetailField label="User Type" value={user.userType} /> : ""}
            {user.gender? <DetailField label="Gender" value={user.gender} /> : ""}
            {user.pan? <DetailField label="Pan" value={user.pan} /> : ""}
            {user.aadhar?<DetailField label="Aadhaar" value={user.aadhar} /> : ""}
            {user.address?<DetailField label="Address" value={user.address} /> : ""}
            {user.createdAt?<DetailField label="created At" value={postDateFormatter.format(new Date(user.createdAt))} /> : ""}
        </div>
    )
}