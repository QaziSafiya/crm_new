import DetailField from "../../components/DetailField.jsx";
import useUser from "../../hooks/useUser.js";

export default function BankDetails() {
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
            <DetailField label="Bank Name" value="Name of Bank" />
            <DetailField label="Bank IFSC" value="IFSC Code" />
            <DetailField label="Bank Account No." value={user.bankAccountNo} />
        </div>
    )
}