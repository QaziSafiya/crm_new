import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import Steps from "../gstrStep";
import Gstr1 from "../gstr1/Gstr1";
import Gstr2a from "../gstr2a/Gstr2a";
import Gstr3b from "../gstr3b/Gstr3b";
import MenuIcon from "../../../components/icons/MenuIcon";

const FileReturn = () => {
  const [active, setActive] = useState(steps[0]);
  const [isOpen, setIsOpen] = useState(true);

  const activePage = () => {
    switch (active) {
      case "GSTR1":
        return <Gstr1 />;
      case "GSTR2A":
        return <Gstr2a />;
      case "GSTR3B":
        return <Gstr3b />;
      default:
        return 0;
    }
  };

  const border = "columns-2-link-active";

  return (
    <div className="container">
      <Sidebar open={false} />
      <div className="main">
        <Topbar />
        <div className="inner-container">
            <div style={{ zIndex: "2" }}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className=" button mobile-only icon-button secondary-icon small"
              >
                <MenuIcon />
              </button>
            </div>
          <div className="grid-container">
              <nav
                className={`small-bar ${isOpen ? "open" : ""} py`}
                style={{ "--py": "5rem" }}
              >
                <Steps
                  steps={steps}
                  flex="column"
                  active={active}
                  setSection={setActive}
                  border={border}
                />
              </nav>
              <div>{activePage()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const steps = ["GSTR1", "GSTR2A", "GSTR3B"];

export default FileReturn;