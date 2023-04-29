import React, { useState } from "react";
import MenuIcon from "../../icons/MenuIcon";

const Table_6_1 = ({ setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="container">
        <div className="main">
          <div className="inner-container">
            <div
              className="flex g-1rem p"
              style={{ backgroundColor: "var(--bg-color)" }}
            >
              <span>6.1 Payment of tax</span>
            </div>
            <Table title={"Cash Ledger Balance"} />
            <Table title={"Credit Ledger Balance"} />

            {/* <div className="text-center">
              <span>{title}</span>
            </div> */}
            <div className="flex g-1rem g-0_25rem-mobile">
              <div className="small-container drawer-relative p-0">
                <div
                  data-open={`${isOpen ? true : false}`}
                  className="flex p dir-col g-1rem mini-container"
                >
                  <div
                    className="flex text-small text-bold separater dir-col gap"
                    style={{ "--gap": "1.6rem" }}
                  >
                    <div className="m-top" style={{ "--m-top": ".9rem" }}>
                      <span>Description</span>
                    </div>
                    <div className="flex jc-between ai-center">
                      <span>Integ ₹</span>
                    </div>
                    <div className="flex jc-between ai-center">
                      <span className="">Central ₹</span>
                    </div>
                    <div className="flex jc-between ai-center">
                      <span>State / UI</span>
                    </div>
                    <div className="flex jc-between ai-center">
                      <span>CESS ₹</span>
                    </div>
                    <div className="flex jc-between ai-center">
                      <span>Other than reverse charge tax to be paid ₹</span>
                    </div>
                    <div className="flex jc-between ai-center">
                      <span>Reverse charge tax payable ₹</span>
                    </div>
                    <div className="flex jc-between ai-center">
                      <span>Reverse charge tax to be paid in cash ₹</span>
                    </div>
                    <div className="flex jc-between ai-center">
                      <span>Interest payable ₹</span>
                    </div>
                    <div className="flex jc-between ai-center">
                      <span>Interest to be paid in cash ₹</span>
                    </div>
                    <div className="flex jc-between ai-center">
                      <span>Late fee payable ₹</span>
                    </div>
                    <div className="flex jc-between ai-center">
                      <span>Late fee to be paid in cash ₹</span>
                    </div>
                    <div className="flex jc-between ai-center">
                      <span>Utilizable cash balance ₹</span>
                    </div>
                    <div className="flex jc-between ai-center">
                      <span>Additional cash required ₹</span>
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
                        </tbody>
                      </table>
                    </div>
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
  );
};

const Table = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="text-center">
        <span>{title}</span>
      </div>
      <div className="flex g-1rem g-0_25rem-mobile">
        <div className="small-container drawer-relative p-0">
          <div
            data-open={`${isOpen ? true : false}`}
            className="flex p dir-col g-1rem mini-container"
          >
            <div
              className="flex text-small text-bold separater dir-col gap"
              style={{ "--gap": "1.5rem" }}
            >
              <div>
                <span>Description</span>
              </div>
              <div className="flex jc-between ai-center">
                <span>Integ ₹</span>
              </div>
              <div className="flex jc-between ai-center">
                <span className="">Central ₹</span>
              </div>
              <div className="flex jc-between ai-center">
                <span>State / UI</span>
              </div>
              <div className="flex jc-between ai-center">
                <span>CESS ₹</span>
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
                      <th className="py-1 p-0_25-mobile">Tax</th>
                      <th className="py-1 p-0_25-mobile">Intersrt</th>
                      <th className="py-1 p-0_25-mobile">Late fees</th>
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
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table_6_1;