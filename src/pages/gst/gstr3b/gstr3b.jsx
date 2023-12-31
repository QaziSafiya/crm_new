import React, { useState } from "react";
import Table_3_1 from "../../../components/gstr/gstr3b/Table_3_1";
import Table_3_1_1 from "../../../components/gstr/gstr3b/Table_3_1_1";
import Table_3_2 from "../../../components/gstr/gstr3b/Table_3_2";
import Table_4 from "../../../components/gstr/gstr3b/Table_4";
import Table_5_1 from "../../../components/gstr/gstr3b/Table_5_1";
import Table_5 from "../../../components/gstr/gstr3b/Table_5";
import Table_6_1 from "../../../components/gstr/gstr3b/Table_6_1";

const gstr3b = () => {

  const [activeSection, setActiveSection] = useState(null);

  const activeWindow = () => {
    switch (activeSection) {
      case 0:
        return <Table_3_1 setActiveSection={setActiveSection} />;
      case 1:
        return <Table_3_1_1 setActiveSection={setActiveSection} />;
      case 2:
        return <Table_3_2 setActiveSection={setActiveSection} />;
      case 3:
        return <Table_4 setActiveSection={setActiveSection} />;
      case 4:
        return <Table_5_1 setActiveSection={setActiveSection} />;
      case 5:
        return <Table_5 setActiveSection={setActiveSection} />;
      case 6:
        return <Table_6_1 setActiveSection={setActiveSection} />;
    }
  };

  return (
    <>
      <div>
        {(activeSection === null) ? (
          <div className="flex flex-wrap jc-center w-100pc text-center p-2rem g-2rem">
            {cardsTitles.length > 0 &&
              cardsTitles.map((title, i) => {
                return (
                  <div
                    onClick={() => setActiveSection(i)}
                    className="card-flex"
                    key={title}
                  >
                    <span>{title}</span>
                    <span>details here</span>
                  </div>
                );
              })}
          </div>
        ) : (
          activeWindow()
        )}
      </div>
    </>
  );
};

const cardsTitles = [
  "3.1 Tax on outward and reverse changes inward supplies",
  "3.1.1 supplies notified under section 9(5)of the CGST Act",
  "3.2 Inter state supplies",
  "4 Eligible ITC",
  "5.1 Interest and late fee for preview tax period",
  "5 Exempt, nill and Non GST inward suppliers",
  "6.1 Payment of tax",
];

export default gstr3b;