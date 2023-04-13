import { useState } from "react";
import { LOAN_TYPES } from "../pages/loan/data.js";

const getRequiredDocuments = (type, salaried) => 
    LOAN_TYPES[type][salaried === 'true' ? 'salaried' : 'nonSalaried'].documents;

const LoanDocumentsForm = ({ type, salaried }) => {
    const requiredDocuments = getRequiredDocuments(type, salaried);
    const [documents, setDocuments] = useState(Object.fromEntries(requiredDocuments.map(doc => [doc, null])));

    const handleDocument = (e, docType) => {
        if(e.files.length) {
            return;
        }

        setDocuments({
            ...documents,
            [docType]: e.files[0]
        });
    };

    return (
        <div className="flex dir-col g-1rem">
            {
                requiredDocuments.map((docType, idx) => (
                    <div key={docType} className="field">
                        <label htmlFor={idx} className="label text-primary">{docType}</label>
                        <input
                            onChange={e => handleDocument(e, docType)}
                            id={`requiredDocument_${idx}`}
                            value={documents[type]}
                            type="file" 
                            className="input" 
                            accept="image/*,application/pdf" 
                        />
                    </div>
                ))
            }
        </div>
    )
};

export default LoanDocumentsForm;