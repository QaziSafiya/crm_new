import React, { useState } from "react";
import MenuIcon from "../../icons/MenuIcon";

const Table_3_1_1 = ({ setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="container">
        <div className="main">
          <div className="inner-container">
            <div className="flex dir-col g-1rem g-0_25rem-mobile">
              <div className="py text-center" style={{"--py": "1rem"}}>
                <span>
                  3.1.1 Details of supplies notified under section 9(5) of the CGST Act,
                  2023 and corresponding provision in IGST/URGST/SGST
                </span>
              </div>
              <div className="small-container drawer-relative p-0">
                <div
                  data-open={`${isOpen ? true : false}`}
                  className="flex p dir-col g-1rem mini-container"
                >
                  <div
                    className="flex text-small text-bold separater dir-col g-2rem margin-y"
                    style={{ "--margin-y": ".75rem" }}
                  >
                    <div
                      className="flex m-top jc-between ai-center"
                      style={{ "--m-top": "4.5rem" }}
                    >
                      <span>Pays tax u/s 9(5)</span>
                      {/* <span>(A)</span> */}
                    </div>
                    <div className="flex jc-between ai-center">
                      <span>Registered person to pay tax u/s 9(5)</span>
                      {/* <span>(B)</span> */}
                    </div>
                  </div>
                </div>
                <div className="w-100pc">
                  <div className="flex g-1rem ai-center p-1rem flex-wrap">
                    <div>
                      <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="button mobile-only icon-button secondary-icon small"
                      >
                        <MenuIcon />
                      </button>
                    </div>

                    <div className="scrollable">
                      <table className="flex-wrap">
                        <thead>
                          <tr>
                            <th className="py-1 p-0_25-mobile">Value</th>
                            <th className="py-1 p-0_25-mobile">Integ ₹</th>
                            <th className="py-1 p-0_25-mobile">Central ₹</th>
                            <th className="py-1 p-0_25-mobile">State/UI</th>
                            <th className="py-1 p-0_25-mobile">CESS ₹</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="p-0_25-mobile">
                              <input type="text" className="input is-small" />
                            </td>
                            <td className="p-0_25-mobile">
                              <input type="text" className="input is-small" />
                            </td>
                            <td className="p-0_25-mobile">
                              <input type="text" className="input is-small" />
                            </td>
                            <td className="p-0_25-mobile">
                              <input type="text" className="input is-small" />
                            </td>
                            <td className="p-0_25-mobile">
                              <input type="text" className="input is-small" />
                            </td>
                          </tr>
                          <tr>
                            <td className="p-0_25-mobile">
                              <input type="text" className="input is-small" />
                            </td>
                            <td className="p-0_25-mobile">
                              <input type="text" className="input is-small" />
                            </td>
                            <td className="p-0_25-mobile">
                              <input type="text" className="input is-small" />
                            </td>
                            <td className="p-0_25-mobile">
                              <input type="text" className="input is-small" />
                            </td>
                            <td className="p-0_25-mobile">
                              <input type="text" className="input is-small" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex jc-center">
              <button
                onClick={() => setActiveSection(null)}
                className="button is-primary is-small"
                style={{ padding: "0 5rem" }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table_3_1_1;