import { useParams } from "react-router-dom";
import DetailField from "../../components/DetailField.jsx";
import useCustomer from "../../hooks/useCustomer.js";

export default function CustomerBankDetails() {
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
            <DetailField label="Bank Name" value="Name of Bank" />
            <DetailField label="Bank IFSC" value="IFSC Code" />
            <DetailField label="Bank Account No." value={customer.bankAccountNo} />
        </div>
    )
}