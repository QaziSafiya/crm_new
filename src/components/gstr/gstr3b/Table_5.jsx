import React, { useState } from "react";
import MenuIcon from "../../icons/MenuIcon";

const Table_5 = ({ setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="container">
        <div className="main">
          <div className="inner-container">
            <div className="flex g-1rem p" style={{ "backgroundColor": "var(--bg-color)" }}>
              <span>
              5. Values of exempt, nill rated and non-GST inward supplies
              </span>
            </div>
            <div className="flex g-1rem g-0_25rem-mobile">
              <div className="small-container drawer-relative p-0">
                <div
                  data-open={`${isOpen ? true : false}`}
                  className="flex p dir-col g-1rem mini-container"
                >
                  <div
                    className="flex text-small text-bold separater dir-col g-1rem margin-y"
                    style={{ "--margin-y": "0rem" }}
                  >
                    <div>
                      <span>Nature of Supplies</span>
                    </div>
                    <div
                      className="flex jc-between ai-center"
                    >
                      <span>
                        Outward taxable supplies (other than zero rated)
                      </span>
                      <span>(A)</span>
                    </div>
                    <div className="flex jc-between ai-center">
                      <span className="">
                        Outward taxable supplies (Zero rated)
                      </span>
                      <span>(B)</span>
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
                            <th className="py-1 p-0_25-mobile">Inter-state ₹</th>
                            <th className="py-1 p-0_25-mobile">Intra-State ₹</th>
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
                          </tr>
                          <tr>
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

export default Table_5;