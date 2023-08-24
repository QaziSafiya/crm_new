import React, { useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import Topbar from '../../../components/Topbar'
import LoanDocumentsForm from '../../../components/LoanDocumentsForm'
import ApplyLoan from '../ApplyLoan'
import { useSearchParams } from 'react-router-dom'

const LoanApplication = () => {
  const [search, setSearch] = useSearchParams();
  const loanType = search.get("type");

    const [showApplyLoan, setShowApplyLoan] = useState(false);
  const [showDocuments, setShowDocuments] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [salaried, setSalaried] = useState("true");

  const [formData, setFormData] = useState({
    id: "",
  });

  const toggleDocuments = () => {
    setShowDocuments(true);
    setShowApplyLoan(false);
  };

  const toggleApplyLoan = () => {
    setShowDocuments(false);
    setShowApplyLoan(true);
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="inner-container">
        <div className='flex justify-center'>
            <div >
            <LoanDocumentsForm type={loanType} salaried={salaried} />

              
            </div>
            <div>
            <ApplyLoan  />
            </div>
        </div>    
      
    </div>
    </div>
    </div>
  )
}

export default LoanApplication