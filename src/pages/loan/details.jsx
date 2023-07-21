import { useState } from "react";
import DetailField from "../../components/DetailField.jsx";
import LoanDocumentsForm from "../../components/LoanDocumentsForm.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import TabButton from "../../components/TabButton.jsx";
import Topbar from "../../components/Topbar.jsx";
import { postDateFormatter } from "../../lib/formatter.js";

export default function LoanDetails() {
  const [salaried, setSalaried] = useState("true");

  const [tab, setTab] = useState("Details");

  const loanType = "Personal Loan";

  const tabs = {
    Details: (
      <>
        <DetailField label="Name" value="Tushar Mehra" editable />
        <DetailField label="Loan Type" value="Personal Loan" />
        <DetailField
          label="Applied on"
          value={postDateFormatter.format(new Date())}
        />
        <DetailField
          label="Last Update"
          value={postDateFormatter.format(new Date())}
        />
        <DetailField label="Status" value="pending" />
        <DetailField label="Bank Name" value="State Bank Of India" />
        <DetailField label="Bank IFSC Code" value="SBIN00000014" />
        <DetailField label="Bank Account no" value="30103010114643" />
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
