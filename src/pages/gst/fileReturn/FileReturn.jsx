import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import Steps from "../gstrStep";
import Gstr1 from "../gstr1/Gstr1";
import Gstr2a from "../gstr2a/Gstr2a";
import Gstr3b from "../gstr3b/Gstr3b";
import MenuIcon from "../../../components/icons/MenuIcon";
import { StoreContext } from "../../../store/store-context";
import { GSTR_MODE } from "../../../store/actions";
import DragJson from "../../../components/gstr/gstr1/DragJson";

const FileReturn = () => {
  const [_, dispatch] = useContext(StoreContext);
  const steps = ["GSTR1", "GSTR2A", "GSTR3B"];

  const [active, setActive] = useState(steps[0]);
  const [isOpen, setIsOpen] = useState(true);
  const [mode, setMode] = useState("offline");

  const activePage = () => {
    switch (active) {
      case "GSTR1":
        return <Gstr1 />;
      case "GSTR2A":
        return <Gstr2a />;
      case "GSTR3B":
        return <Gstr3b />;
      case "Import JSON":
        return <DragJson setSection={setActive} />;
      default:
        return null;
    }
  };

  const border = "columns-2-link-active";

  useEffect(() => {
    dispatch({ type: GSTR_MODE, payload: mode });
    if (mode === "online") {
      setActive(steps[0]);
    } else {
      setActive("Import JSON");
    }
  }, [mode]);

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
              <div
                className="margin-x margin-y"
                style={{ "--margin-x": ".25rem", "--margin-y": ".25rem" }}
              >
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="select"
                  name="online_or_offline"
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
              {mode === "online" && (
                <Steps
                  steps={steps}
                  flex="column"
                  active={active}
                  setSection={setActive}
                  border={border}
                />
              )}
              {mode === "offline" && (
                <Steps
                  steps={steps}
                  flex="column"
                  active={active}
                  setSection={setActive}
                  border={border}
                  importJson={true}
                />
              )}
            </nav>
            <div>{activePage()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileReturn;