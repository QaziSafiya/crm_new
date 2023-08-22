import { useEffect, useState } from "react";
import DetailField from "../../components/DetailField.jsx";
import LoanDocumentsForm from "../../components/LoanDocumentsForm.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import TabButton from "../../components/TabButton.jsx";
import Topbar from "../../components/Topbar.jsx";
import { postDateFormatter } from "../../lib/formatter.js";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants.js";

export default function LoanDetails() {
  const { id } = useParams();
  const [salaried, setSalaried] = useState("true");

  const [tab, setTab] = useState("Details");
  const [loanApplication, setLoanApplication] = useState({});
  
  useEffect(() => {
    fetchData();
  }, []);


  const loanType = "Personal Loan";

  const fetchData = async () => {
    console.log(id)
    const storedData = JSON.parse(localStorage.getItem('itaxData'));
    try {

      const response = await axios.get(`${BASE_URL}/loan/applications/${id}`, {
        headers: {
          Authorization: `Bearer ${storedData.token}`,
        },
      });

      if (response.status === 200) {
        console.log(response.data.data.application)
        setLoanApplication(response.data.data.application); // Set fetched data in the state
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Failed to fetch API', error);
    }
  };
   console.log(loanApplication.applicantName)
  const tabs = {
    Details: (
      <>
        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold ">Name</label>
          <h4>{loanApplication.applicantName}</h4>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold ">Age</label>
          <h4>{loanApplication.applicantAge}</h4>
        </div>
        {/* <DetailField label="Name" value={loanApplication.applicantName} editable /> */}
        {/* <div className="mb-4">
        <DetailField label="Loan Type" value="Personal Loan" />
        </div> */}
        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold ">Applied on</label>
          <h4>{loanApplication.createdAt}</h4>
        </div>
        {/* <DetailField
          label="Applied on"
          value={loanApplication.createdAt}
        /> */}
        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold ">Last Update</label>
          <h4>{loanApplication.updatedAt}</h4>
        </div>
        {/* <DetailField
          label="Last Update"
          value={loanApplication.updatedAt}
        /> */}
        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold ">Status</label>
          <h4>{loanApplication.loanStatus}</h4>
        </div>
        {/* <DetailField label="Status" value={loanApplication.loanStatus} /> */}
        
        {/* <DetailField label="Bank Name" value={loanApplication.bankName} /> */}
        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold ">ID</label>
          <h4>{loanApplication.id}</h4>
        </div>
        {/* <DetailField label="Bank IFSC Code" value={loanApplication.bankIfsc} /> */}
        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold ">Address</label>
          <h4>{loanApplication.address}</h4>
        </div>
        {/* <DetailField label="Bank Account no" value={loanApplication.bankAccountNo} /> */}
        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold ">Permanent Address</label>
          <h4>{loanApplication.permanentAddress}</h4>
        </div>
      </>
    ),
    Documents: (
      <>
        <div className="flex dir-col g-1rem">
          <strong>Are you salaried?</strong>
          <select
            className="select is-small"
            onChange={(e) => setSalaried(e.target.value)}
            value={salaried}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <h6 className="text-primary">Required Documents</h6>
        {salaried === "" ? null : (
          <LoanDocumentsForm type={loanType} salaried={salaried} />
        )}
      </>
    ),
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="inner-container">
          <h6 className="text-secondary">Details of Loan</h6>
          <div className="section">
            <div className="tabs">
              {Object.keys(tabs).map((_tab) => {
                return (
                  <TabButton tab={_tab} setTab={setTab} currentTab={tab}>
                    {_tab}
                  </TabButton>
                );
              })}
            </div>
            {tabs[tab]}
          </div>
        </div>
      </div>
    </div>
  );
}
