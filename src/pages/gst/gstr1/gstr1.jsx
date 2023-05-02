import React, { useState } from "react";
import AddRecord from "../../../components/gstr/gstr1/addRecord/AddRecord.jsx";
import AmendRecord from "../../../components/gstr/gstr1/amendRecord/AmendRecord.jsx";
import EInvoice from "../../../components/gstr/gstr1/eInvoice/EInvoice.jsx";
import Steps from "../gstrStep";

const gstr1 = () => {
  const [section, setSection] = useState(sectionList[0]);

  function activeTab() {
    if (section === sectionList[1]) {
      return <AmendRecord setSection={setSection} />;
    } else if (section === sectionList[2]) {
      return <EInvoice setSection={setSection} />;
    } else {
      return <AddRecord setSection={setSection} />;
    }
  }

  const border = "columns-2-link-active-2"

  return (
    <>
      <div>
        <Steps steps={sectionList} active={section} setSection={setSection} border={border} />
        {activeTab()}
      </div>
    </>
  );
};

const sectionList = [
  "Add record details",
  "Amend record details",
  "E-invoice download history",
];

export default gstr1;
