import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import Steps from "../gstrStep";
import Gstr1 from "../gstr1/Gstr1";
import Gstr2a from "../gstr2a/Gstr2a";
import Gstr3b from "../gstr3b/Gstr3b";
import MenuIcon from "../../../components/icons/MenuIcon";
import { StoreContext } from "../../../store/store-context";
import { GSTR_MODE, GSTR_OBJ } from "../../../store/actions";
import Dropzone from "react-dropzone";

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

const DragJson = ({ setSection }) => {
  const [success, setSuccess] = useState(false);
  const [_, dispatch] = useContext(StoreContext);

  const handleJSON = async (files) => {
    try {
      const importedJson = await new Response(files[0]).json();
      dispatch({type: GSTR_OBJ, payload: importedJson})
      setSuccess(true);
    } catch (err) {
      console.log(err);
      throw new Error("Invalid file, Could not Process the file..");
    }
  };

  return (
    <>
      <Dropzone onDrop={(acceptedFiles) => handleJSON(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <h2 className="margin-y text-bold text-large">Import JSON</h2>
            <div {...getRootProps()} className="drag-drop">
              <div
                className="flex dir-col items-center jc-center py margin-y"
                style={{ "--py": "10rem" }}
              >
                <input {...getInputProps()} />
                <button className="button is-small is-primary">
                  Select Files
                </button>
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
      {success && (
        <div className="flex dir-col items-center">
          <p className="text-bold" style={{ color: "green" }}>
            Your file is submitted
          </p>
          <button
            onClick={() => setSection("GSTR1")}
            className="button is-small is-primary"
          >
            Continue to next step
          </button>
        </div>
      )}
    </>
  );
};

export default FileReturn;