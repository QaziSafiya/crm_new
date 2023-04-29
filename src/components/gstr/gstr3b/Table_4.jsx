import React, { useState } from "react";
import MenuIcon from "../../icons/MenuIcon";

const Table_4 = ({ setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="container">
        <div className="main">
          <div className="inner-container">
            <div className="flex g-1rem g-0_25rem-mobile">
              <div className="small-container drawer-relative p-0">
                <div
                  data-open={`${isOpen ? true : false}`}
                  className="flex p dir-col g-1rem mini-container"
                >
                  <div className="flex text-small text-bold separater dir-col margin-y" style={{ "--margin-y": "2rem" }}>
                    <div className="flex g-1rem m-top" style={{ "--m-top": "2rem" }}>
                      <span>(A)</span>
                      <span>ITC available</span>
                    </div>
                    <div className="flex g-1rem">
                      <span>(1)</span>
                      <span>Import of service</span>
                    </div>
                    <div className="flex margin-y g-1rem" style={{ "--margin-y": "1.65rem" }}>
                      <span>(2)</span>
                      <span>Import of services</span>
                    </div>
                    <div className="flex g-1rem">
                      <span>(3)</span>
                      <span>Inward supplies reverse charge</span>
                    </div>
                    <div className="flex g-1rem margin-y" style={{ "--margin-y": "1.6rem" }}>
                      <span>(4)</span>
                      <span>Inward supplies from ISD</span>
                    </div>
                    <div className="flex g-1rem">
                      <span>(5)</span>
                      <span>All other ITC</span>
                    </div>
                    <div className="flex m-top g-1rem" style={{ "--m-top": "1rem" }}>
                      <span>(B)</span>
                      <span>ITC reversed</span>
                    </div>
                    <div className="flex g-1rem">
                      <span>(1)</span>
                      <span>38, 42, & 43 of CGST rule sec 17 (5)</span>
                    </div>
                    <div className="flex g-1rem margin-y" style={{ "--margin-y": "1.6rem" }}>
                      <span>(2)</span>
                      <span>Other</span>
                    </div>
                    <div className="flex g-1rem">
                      <span>(C)</span>
                      <span>Net ITC available (A) - (B)</span>
                    </div>
                    <div className="flex g-1rem m-top" style={{ "--m-top": "1rem" }}>
                      <span>(D)</span>
                      <span>Other Details</span>
                    </div>
                    <div className="flex g-1rem">
                      <span>ITC reclaimed 4(B) (2) in earlier tax period</span>
                    </div>
                    <div className="flex g-1rem margin-y" style={{ "--margin-y": "1.65rem" }}>
                      <span>Ineligible ITC 16(4) ITC restricted pos rule</span>
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
                            <th className="py-1 p-0_25-mobile">IGST</th>
                            <th className="py-1 p-0_25-mobile">CGST</th>
                            <th className="py-1 p-0_25-mobile">SGST</th>
                            <th className="py-1 p-0_25-mobile">CESS</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td></td>
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
                          <tr>
                            <td></td>
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
                          <tr>
                            <td></td>
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

export default Table_4;