import useCustomer from "../../hooks/useCustomer.js";
import DetailField from "../../components/DetailField.jsx";
import { useParams } from "react-router-dom";

export default function PersonalInfo() {
    const { id } = useParams();
    const { customer, loading } = useCustomer(id);

    if(loading) {
        return (
            <div className="flex jc-center ai-center">
                <span className="spinner small"></span>
            </div>
        )
    }

    return (
        <div className="flex dir-col g-1rem">
            <DetailField label="Name" value={customer.fullName} />
            <DetailField label="DOB" value={customer.dob} />
            <DetailField label="Email" value={customer.email} type="email" />
            <DetailField label="Mobile no" value={customer.phone} type="phone" />
            <DetailField label="Marriage Anniversary" value="10/10/12" />
            <DetailField label="Pan no." value={customer.pan} />
            <DetailField label="Aadhaar" value={customer.aadhar} />
            <DetailField label="Address" value="Kol baz bahadur Azamgarh" />
        </div>
    )
}