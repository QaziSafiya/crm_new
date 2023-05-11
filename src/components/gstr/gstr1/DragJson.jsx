import { useContext, useState } from "react";
import { StoreContext } from "../../../store/store-context";
import Dropzone from "react-dropzone";
import { GSTR_OBJ } from "../../../store/actions";

const DragJson = ({ setSection }) => {
    const [success, setSuccess] = useState(false);
    const [_, dispatch] = useContext(StoreContext);
  
    const handleJSON = async (files) => {
      try {
        const importedJson = await new Response(files[0]).json();
        // ctin = gstr
        // inv[0].pos = pos
        // inv[0].val = invoice value
        // inv[0].idt = invoice date
        // inv[0].inum = invoice value
        // inv[0].invTyp = nature value

        // console.log(importedJson);
        // dispatch({type: GSTR_OBJ, payload: importedJson})
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

export default DragJson;