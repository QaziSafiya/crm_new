import React, { useState } from "react";
import Steps from "../gstrStep";

const gstr2a = () => {
  const [section, setSection] = useState(sectionList[0]);

  // function activeTab() {
  //   if (section === sectionList[1]) {
  //     return <Part_two setSection={setSection} />;
  //   } else if (section === sectionList[2]) {
  //     return <Part_three setSection={setSection} />;
  //   } else {
  //     return <Part_one setSection={setSection} />;
  //   }
  // }

  const border = "columns-2-link-active-2";

  return (
    <>
      <div>
        <Steps
          steps={sectionList}
          active={section}
          setSection={setSection}
          border={border}
        />
        {/* {activeTab()} */}
      </div>
    </>
  );
};

const sectionList = [
  "Add record details",
  "Amend record details",
  "E-invoice download history",
];

export default gstr2a;