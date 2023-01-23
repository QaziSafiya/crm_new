import DetailField from "../../components/DetailField.jsx";
import useUser from "../../hooks/useUser.js";

export default function CompanyDetails() {
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
            <DetailField label="Business Name" value={user.businessName} />
            <DetailField label="Website" value="https://example.com" type="link" />
            <DetailField label="GSTIN" value={user.gstNo} />
            <DetailField label="Secondary Mobile No." value="8989898989" type="phone" />
            <DetailField label="Secondary Email" value="email@email.com" type="email" />
            <DetailField label="Office Address" value="Kol baz bahadur Azamgarh" />
        </div>
    )
}