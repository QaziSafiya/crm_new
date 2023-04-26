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
  const [active, setActive] = useState("GSTR1");

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

  return (
    <div className="container">
      <Sidebar open={false} />
      <div className="main">
        <Topbar />
        <div className="inner-container">
          <div className="small-container" style={{ padding: 0 }}>
            <div className="container mini-container">
              <div
                className="side-bar-container open"
                style={{ minWidth: "15rem" }}
              >
                <div className="side-bar">
                  <nav className="side-nav">
                    <div className="">
                      <Steps
                        steps={steps}
                        flex="column"
                        active={active}
                        setSection={setActive}
                      />
                    </div>
                  </nav>
                </div>
              </div>
              {activePage()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const steps = ["GSTR1", "GSTR2A", "GSTR3B"];

export default FileReturn;