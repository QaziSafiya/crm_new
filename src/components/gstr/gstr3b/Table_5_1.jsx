import React, { useState } from "react";
import MenuIcon from "../../icons/MenuIcon";

const Table_5_1 = ({ setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="container">
        <div className="main">
          <div className="inner-container">
            <div className="flex g-1rem p" style={{"backgroundColor": "var(--bg-color)"}}>
              <span>
                5.1 Interest and late fee for previous tax period
              </span>
            </div>
            <div className="flex g-1rem p" style={{"backgroundColor": "var(--bg-color)"}}>
              <input type="checkbox" id="interestLiablity" />
              <label htmlFor="interestLiablity">
                Please select the checkbox if you wish to declare any Interest
                liabilities need to be paid in cash in addition to tax
                liabilities for the month
              </label>
            </div>
            <div className="flex g-1rem g-0_25rem-mobile">
              <div className="small-container drawer-relative p-0">
                <div
                  data-open={`${isOpen ? true : false}`}
                  className="flex p dir-col mini-container"
                  style={{ "--width": "15rem" }}
                >
                  <div
                    className="flex text-bold separater dir-col gap"
                    style={{"--gap": "1.2rem" }}
                  >
                    <div className="flex jc-between ai-center">
                      <span>Description</span>
                    </div>
                    <div className="flex text-small jc-between ai-center">
                      <span>Interest</span>
                    </div>
                    <div className="flex text-small jc-between ai-center">
                      <span>Late fees</span>
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

export default Table_5_1;
