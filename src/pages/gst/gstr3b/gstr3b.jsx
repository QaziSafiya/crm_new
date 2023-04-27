import React, { useState } from "react";
import Steps from "../gstrStep";

const gstr3b = () => {
  // const [section, setSection] = useState(sectionList[0]);

  // function activeTab() {
  //   if (section === sectionList[1]) {
  //     return <Part_two setSection={setSection} />;
  //   } else if (section === sectionList[2]) {
  //     return <Part_three setSection={setSection} />;
  //   } else {
  //     return <Part_one setSection={setSection} />;
  //   }
  // }

  // const border = "columns-2-link-active-2";

  return (
    <>
      <div>
      <div className='grid grid-col-5 text-center p-2rem g-2rem'>
        {cardsTitles.length > 0 && cardsTitles.map((title) => {
          return (
            <div className="card-grid" key={title}>
              <span>{title}</span>
              <span>details here</span>
            </div>
          )
        })}
      </div>
        {/* {activeTab()} */}
      </div>
    </>
  );
};

// const sectionList = [
//   "Add record details",
//   "Amend record details",
//   "E-invoice download history",
// ];

const cardsTitles = [
  "3.1 Tax on outward and reverse changes inward supplies",
  "3.1.1 supplies notified under section 9(5)of the CGST Act",
  "3.2 Inter state supplies",
  "4 Eligible ITC",
  "5.1 Interest and late fee for preview tax period",
  "5 Exempt, nill and Non GST inward suppliers",
  "6.1 Payment of tax=",
]

export default gstr3b;