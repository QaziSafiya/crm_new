import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import LoanDocumentsForm from "../../components/LoanDocumentsForm.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";
import { LOAN_TYPES } from "./data.js";

export default function ApplyForLoan() {
    const [search, setSearch] = useSearchParams();
    const loanType = search.get('loanType');
    const [salaried, setSalaried] = useState('true');

    return (
        <div className="container">
            <Sidebar />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    <h6 className="text-secondary">Apply For Loan</h6>
                    {
                            loanType
                                ? (
                                    <div className="section">
                                        <div className="flex dir-col g-1rem">
                                            <strong>Are you salaried?</strong>
                                            <select className="select is-small" onChange={e => setSalaried(e.target.value)} value={salaried}>
                                                <option value="true">Yes</option>
                                                <option value="false">No</option>
                                            </select>
                                        </div>
                                        <h6 className="text-primary">Required Documents</h6>
                                        {
                                            salaried === ''
                                                ? null
                                                : <LoanDocumentsForm type={loanType} salaried={salaried} />
                                        }
                                        <button className="button is-primary">
                                            Apply
                                        </button>
                                    </div>
                                )
                                : (
                                    <div className="flex g-1rem">
                                        {
                                            Object.keys(LOAN_TYPES).map(type => (
                                                <div key={type} onClick={() => setSearch({ loanType: type })} className="card hoverable jc-center ai-center">
                                                    <h6 className="text-center">{type}</h6>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                        }
                </div>
            </div>
        </div>
    );
}