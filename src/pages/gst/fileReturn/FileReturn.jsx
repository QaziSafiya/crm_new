import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
// import SideNavLink from '../../../components/SideNavLink'
// import Menu from '../../../components/Menu'
import Steps from "../gstrStep";
import Gstr1 from "../gstr1/Gstr1";
import Gstr2 from "../gstr2a/Gstr2a";
import Gstr3 from "../gstr3b/Gstr3b";

const FileReturn = () => {
  const [active, setActive] = useState(steps[0]);

  const activePage = () => {
    switch (active) {
      case "GSTR1":
        return <Gstr1 />;
      case "GSTR2A":
        return <Gstr2 />;
      case "GSTR3B":
        return <Gstr3 />;
      default:
        return 0;
    }
  };

  const border = "columns-2-link-active"

  return (
    <div className="container">
      <Sidebar open={false} />
      <div className="main">
        <Topbar />
        <div className="inner-container">
          <div className="grid-container">
            <div className="columns-2">
              <nav className="py" style={{"--py": "5rem"}}>
                <Steps
                  steps={steps}
                  flex="column"
                  active={active}
                  setSection={setActive}
                  border={border}
                />
              </nav>
              <div className="">{activePage()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const steps = ["GSTR1", "GSTR2A", "GSTR3B"];

export default FileReturn;